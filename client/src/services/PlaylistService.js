import { createApiClient } from './ApiService';

class PlaylistService {
    constructor(baseUrl = "/playlist") {
        this.api = createApiClient(baseUrl);
    }

    async getAll() {
        try {
            const response = await this.api.get("/");
            return response.data.playlists;
        } catch (error) {
            throw error;
        }
    }

    async create(data) {
        try {
            const response = await this.api.post("/", data);
            return response.data.playlist;
        } catch (error) {
            throw error;
        }
    }

    async getAllSongs(id) {
        try {
            const response = await this.api.get(`song/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async addSong(playlistId, songId) {
        try {
            const response = await this.api.post(`/song/${playlistId}`, { songId });
            return response.data.playlistItem;
        } catch (error) {
            throw error;
        }
    }

    async delete(playlistId) {
        try {
            const response = await this.api.delete(`/${playlistId}`);
            return response.data.message;
        } catch (error) {
            throw error;
        }
    }

    async deleteSong(playlistId, songId) {
        try {
            const response = await this.api.delete(`/song/${playlistId}`, { data: { songId } });
            return response.data.message;
        } catch (error) {
            throw error;
        }
    }
}

export default new PlaylistService();
