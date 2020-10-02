const AXIOS = require("axios").default;

const API_LINK = "https://api.deezer.com/";

class Deezer {

    /**
     * Get a array of all track information by album ID
     * @param {string} albumIdD
     * @returns {[{album: Object, artists: Object[], href: string, id: string, name: string}]}
     */
    static async getAlbumTracks(albumID) {
        let response = await AXIOS.get(API_LINK + "album/" + albumID);

        return await this.getTracks(response.data.tracks.data.map(item => item.id));
    }

    /**
     * Get a array of all track information by playlist ID
     * @param {string} playlistID
     * @returns {[{album: Object, artists: Object[], href: string, id: string, name: string}]}
     */
    static async getPlaylistTracks(playlistID) {
        let response = await AXIOS.get(API_LINK + "playlist/" + playlistID);
        
        return await this.getTracks(response.data.tracks.data.map(item => item.id));
    }

    /**
     * Get a array of track information
     * @param {string} trackID 
     * @returns {[{album: Object, artists: Object[], href: string, id: string, name: string}]}
     */
    static async getTrack(trackID){
        let response = await AXIOS.get(API_LINK + "track/" + trackID);

        return response.data;
    }

    /**
     * Get 
     * @param {string} link 
     */
    static async getTracksByLink(link) {
        if(!link.includes("deezer")) return {};
        
        if(link.includes("deezer.page.link")){
            let response = await AXIOS.get("https://deezer.page.link/NfCQe619nnyEa8Lk8");
            
            link =  response.request._redirectable._options.href;
        }

        let splitedLink = link.split("?")[0].split("/");

        let id = splitedLink.pop();
        let type = splitedLink.pop();

        let methodAndParamsForType = {
            album: ["getAlbumTracks", id],
            playlist: ["getPlaylistTracks", id],
            track: ["getTrack", id]
        }

        let method = methodAndParamsForType[type];

        return await this[method[0]](method[1]);
    }
}

module.exports = Deezer;

Deezer.getTracksByLink("https://www.deezer.com/track/1085907332?utm_source=deezer&utm_content=track-1085907332&utm_term=3910132982_1601675637&utm_medium=web").then(response => {
    console.log(response);
});