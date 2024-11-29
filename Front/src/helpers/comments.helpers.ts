
const APIURL = process.env.NEXT_PUBLIC_API_URL;

export const fetchComments = async (id: string, body: any) => {
    let TOKEN = null;

    if (typeof window !== "undefined") {
        const storedToken = localStorage.getItem("userSession");
        TOKEN = storedToken ? JSON.parse(storedToken) : null;
    }

    if (!TOKEN || !TOKEN.token) {
        console.error("Token is missing or invalid.");
        return null;
    }
    const response = await fetch(`${APIURL}/reviews/create/${id}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${TOKEN.token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });
    const data = await response.json();
    console.log(data);

    return data;

}