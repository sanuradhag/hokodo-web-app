export const request = async <T>(url: string): Promise<T> => {
    try {
        const response = await fetch(url, {
            headers: {
                'Accept': 'application/json'
            }
        });
        if (response.ok) {
            return await response.json();
        } else {
            return handleError(response.status, url);
        }

    } catch (e) {
        throw new Error(`An error occurred while requesting ${url} ${e}`);
    }
}

const handleError = (status: number, url: string) => {
    // can add a global notification/toaster to notify the error message
    switch (status) {
        case 404:
            throw new Error(`Invalid URL ${url}`);
        case 400:
            throw new Error(`Bad request ${url}`);
        default:
            throw new Error(`An error occurred while requesting ${url}`);
    }
}