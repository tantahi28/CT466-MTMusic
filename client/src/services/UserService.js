import { createApiClient } from './ApiService';

class UserService {
    constructor(baseUrl = "/user") {
        this.api = createApiClient(baseUrl);
    }

    async getUserInfo() {
        try {
            const response = await this.api.get("/");
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async updateUser(data) {
        try {
            const response = await this.api.put("/", data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

}

export default new UserService();
