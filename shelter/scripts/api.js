// функция загрузки массива питомцев

export async function fetchPets() {
    try {
        const response = await fetch('./pets.json');
        
        if (!response.ok) {
            throw new Error(`Load error: ${response.status}`);
        }

        const pets = await response.json();
        return pets;

    } catch (error) {
        console.error('Could not fetch data:', error);
        return [];
    }
}