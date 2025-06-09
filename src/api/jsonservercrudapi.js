import { toast } from "react-toastify";

const BASE_URL = 'https://localhost:7575';

export const jsonservercrudapi = {
    getBooks: async (resource) => {
        try {
            const response = await fetch(`${BASE_URL}/${resource}`, { method: "GET" });

            if (!response) {
                toast.error('Error fetching books (GET BOOKS REQUEST)');
                return
            }

            console.log(JSON.parse(response));
        } catch (error) {
            console.error(error)
        }
    },
    setBooks: async (resource, value) => {
        try {
            const response = await fetch(`${BASE_URL}/${resource}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(value)
            })

            if (!response) {
                toast.error('Error storing books (SET BOOKS REQUEST)');
                return
            }

            console.log(response);
        } catch (error) {
            console.error(error)
        }
    },
    removeBook: (resource, id) => {
        try {
            const data = jsonservercrudapi.getBooks(resource);
            const newUpdatedData = data.filter(book => book.id !== id);
            jsonservercrudapi.setBooks(resource, newUpdatedData);
        } catch (error) {
            console.error(error)
        }
    },
    updateBook: (resource, id) => {
        try {
            //
        } catch (error) {
            //
        }
    }
}