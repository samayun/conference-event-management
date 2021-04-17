// import axios from "axios"


let data = [
    {
        _id: 3,
        title: 'Litrature',
        icon: 'fa fa-book',
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda quia veniam corporis! Nostrum minima totam, distinctio quibusdam error possimus veritatis consequatur blanditiis ut suscipit atque, illum maiores non ipsam mollitia?"
    },
    {
        _id: 5555,
        title: 'Technology',
        icon: 'fa fa-book',
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda quia veniam corporis! Nostrum minima totam, distinctio quibusdam error possimus veritatis consequatur blanditiis ut suscipit atque, illum maiores non ipsam mollitia?"
    },
    {
        _id: 33,
        title: 'Online Earning',
        icon: 'fa fa-book',
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda quia veniam corporis! Nostrum minima totam, distinctio quibusdam error possimus veritatis consequatur blanditiis ut suscipit atque, illum maiores non ipsam mollitia?"
    },
    {
        _id: 53,
        title: 'Online Earning',
        icon: 'fa fa-book',
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda quia veniam corporis! Nostrum minima totam, distinctio quibusdam error possimus veritatis consequatur blanditiis ut suscipit atque, illum maiores non ipsam mollitia?"
    }
]
class Service {
    async getAll() {
        try {

            // let { data } = await axios.get('/services')
            return data.slice(0, 3);
            // throw new Error("Failed TO Fetch Services");
        } catch (error) {
            throw new Error("Failed TO Fetch Services");
        }
    }
}

// eslint-disable-next-line 
export default new Service