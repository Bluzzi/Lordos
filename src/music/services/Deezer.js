const AXIOS = require("axios").default;

const API_LINK = "https://api.deezer.com/";

class Deezer {

    /**
     * Get a array of all track information by album ID
     * @param {string} albumIdD
     * @returns {[{id: int, title: string, link: string, artist: [{id: int, name: string}]}]}
     */
    static async getAlbumTracks(albumID) {
        let response = await AXIOS.get(API_LINK + "album/" + albumID);

        return response.data.tracks.data;
    }

    /**
     * Get a array of all track information by playlist ID
     * @param {string} playlistID
     * @returns {[{id: int, title: string, link: string, artist: [{id: int, name: string}]}]}
     */
    static async getPlaylistTracks(playlistID) {
        let response = await AXIOS.get(API_LINK + "playlist/" + playlistID);
        
        return response.data.tracks.data;
    }

    /**
     * Get a array of track information
     * @param {string} trackID 
     * @returns {[{id: int, title: string, link: string, contributors: [{id: int, name: string}]}]}
     */
    static async getTrack(trackID){
        let response = await AXIOS.get(API_LINK + "track/" + trackID);

        return [response.data];
    }

    /**
     * Get the tracks list by Deezer share link.
     * @param {string} link 
     * @returns {[{id: int, title: string, link: string, author_name: string}]}
     */
    static async getTracksByLink(link) {
        // Check if it is a good deezer link :
        if(!link.includes("deezer")) return {};
        
        // Convert partage link to correct link :
        if(link.includes("deezer.page.link")){
            let response = await AXIOS.get("https://deezer.page.link/NfCQe619nnyEa8Lk8");
            
            link =  response.request._redirectable._options.href;
        }

        // Check type (album, playlist or track) and ID :
        let splitedLink = link.split("?")[0].split("/");

        let id = splitedLink.pop();
        let type = splitedLink.pop();

        let methodAndParamsForType = {
            album: ["getAlbumTracks", id],
            playlist: ["getPlaylistTracks", id],
            track: ["getTrack", id]
        }

        // Get the tracks :
        let method = methodAndParamsForType[type];

        // Get track author :
        let response = await this[method[0]](method[1]);

        response = response.map(track => {
            if(track.artist){
                track.author_name = track.artist.name;
            } else if(track.contributors){
                track.author_name = track.contributors.name;
            }

            return track;
        });

        // Return the reponse :
        return response;
    }
}

module.exports = Deezer;