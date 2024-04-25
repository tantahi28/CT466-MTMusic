import { createApiClient } from './ApiService';

class FavouriteService {
    constructor(baseUrl = "/favourite") {
        this.api = createApiClient(baseUrl);
    }

    async getAllSong() {
        try {
            const response = await this.api.get("/");
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    
    async addFavorite(data) {
        try {
            const response = await this.api.post("/", data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async deleteFavorite(id) {
        try {
            const response = await this.api.delete(`/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }



}

export default new FavouriteService();
