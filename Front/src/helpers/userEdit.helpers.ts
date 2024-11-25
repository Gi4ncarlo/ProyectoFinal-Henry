

const APIURL = process.env.NEXT_PUBLIC_API_URL;
const TOKEN = JSON.parse(localStorage.getItem("userSession") || "null")
export const userEdit = async(id: number, updatedData: any) => {
    try {
        const response = await fetch(`${APIURL}/user/${id}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${TOKEN.token}`, 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        }); 
        
        if (!response.ok) {
            throw new Error('Failed to update user data');
        }

        const updatedUser = await response.json();
        return updatedUser;
    } catch (error) {
        console.error('Error updating user data:', error);
        return null;
    }
};
