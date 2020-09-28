const AXIOS = require("axios").default;
const QS = require("query-string");

const CLIENT_ID = "d1b71d7d8fc640d8a1ac02af379fc790";
const CLIENT_SECRET = "c427a92b365c42798c177b3ca5b152cc";

const API_LINK = "https://api.spotify.com/v1/";

class Spotify {

    /**
     * Get the token for the Web API
     * @returns {string} the token
     */
    static async getToken(){
        let response = await AXIOS.post(
            "https://accounts.spotify.com/api/token", 
            QS.stringify({
                grant_type: "client_credentials"
            }),
            {
                headers: {
                    "Authorization": "Basic " + Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64"),
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }
        );

        return "Bearer " + response.data.access_token;
    }

    /**
     * Get a array of all track information by album ID
     * @param {string} albumIdD
     * @returns {[{album: Object, artists: Object[], href: string, id: string, name: string}]}
     */
    static async getAlbumTracks(albumID){
        let response = await AXIOS.get(API_LINK + "albums/" + albumID + "/tracks", {
            headers: {
                Authorization: await this.getToken()
            },
            params: {
                limit: 50
            }
        }).catch(error => {
            throw error;
        });

        return await this.getTracks(response.data.items.map(item => item.id));
    }

    /**
     * Get a array of all track information by playlist ID
     * @param {string} playlistID
     * @returns {[{album: Object, artists: Object[], href: string, id: string, name: string}]}
     */
    static async getPlaylistTracks(playlistID){
        let response = await AXIOS.get(API_LINK + "playlists/" + playlistID + "/tracks", {
            headers: {
                Authorization: await this.getToken()
            },
            params: {
                limit: 100
            }
        }).catch(error => {
            throw error;
        });

        return await this.getTracks(response.data.items.map(item => item.track.id));
    }

    /**
     * Get a array of track information
     * @param {string[]} tracksID 
     * @returns {[{album: Object, artists: Object[], href: string, id: string, name: string}]}
     */
    static async getTracks(tracksID){
        let response = await AXIOS.get(API_LINK + "tracks", {
            headers: {
                Authorization: await this.getToken()
            },
            params: {
                ids: tracksID.slice(0, 50).join(",")
            }
        }).catch(error => {
            throw error;
        });

        return response.data.tracks;
    }

    /**
     * Get 
     * @param {string} link 
     */
    static async getTracksByLink(link){
        if(!link.includes("open.spotify.com")) return {};

        let type = link.split("/")[3];
        let id = link.split("/")[4].split("?")[0];

        let methodAndParamsForType = {
            album: ["getAlbumTracks", id],
            playlist: ["getPlaylistTracks", id],
            track: ["getTracks", [id]]
        }

        let method = methodAndParamsForType[type];

        return await this[method[0]](method[1]);
    }
}

module.exports = Spotify;