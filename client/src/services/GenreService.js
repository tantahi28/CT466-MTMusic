import { createApiClient } from './ApiService';

class GenreService {
    constructor(baseUrl = "/genre") {
        this.api = createApiClient(baseUrl);
    }

    async get(id) {
        try {
            const response = await this.api.get(`detail/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async getAll() {
        try {
            const response = await this.api.get("/");
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async create(data) {
        try {
            const response = await this.api.post("/", data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }


    async getAllSong(id) {
        try {
            const response = await this.api.get(`/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async update(id, data) {
        try {
            const response = await this.api.put(`/${id}`, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async delete(id) {
        try {
            const response = await this.api.delete(`/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default new GenreService();
