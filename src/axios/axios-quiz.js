import axios from 'axios'

export default axios.create({
    baseURL: 'https://react-quiz-31d3a.firebaseio.com/'
})