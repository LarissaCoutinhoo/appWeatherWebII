const API_KEY = '79a6749dd41f608c47f6bc0ca13ae76a'; // minha chave openWeather


// tradução das descrições para pt-br
const weatherDescriptions = {
    'clear sky': 'Céu limpo',
    'few clouds': 'Poucas nuvens',
    'scattered clouds': 'Nuvens dispersas',
    'broken clouds': 'Nuvens quebradas',
    'overcast clouds': 'Nuvens nubladas',
    'shower rain': 'Chuva leve',
    'rain': 'Chuva',
    'thunderstorm': 'Trovoada',
    'snow': 'Neve',
    'mist': 'Névoa'
};

const app = new Vue({
    el: '#app',
    data: {
        city: '', // cidade digitada pelo usuário
        weatherData: null, // dados do clima
        loadingMessage: 'Digite o nome de uma cidade acima e clique em "Obter Clima"' // msg de orientação
    },
    methods: {
        fetchWeather() {
            // msg de erro caso o usuário não informe uma cidade
            if (!this.city) {
                alert('Por favor, digite o nome de uma cidade.');
                return;
            }

            // API openWeather para buscar dados
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&appid=${API_KEY}`;
            
            // requisição HTTP
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    // tradução
                    if (data.weather && data.weather.length > 0) {
                        const weather = data.weather[0];
                        weather.description_pt = weatherDescriptions[weather.description] || weather.description;
                    }
                    this.weatherData = data; // guarda os dados do clima na variável weatherData
                })
                .catch(error => {
                    console.error('Erro ao buscar dados:', error); // msg de erro na requisição
                });
        }
    }
});

