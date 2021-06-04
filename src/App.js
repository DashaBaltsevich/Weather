//файл для объединения всех компонентов
import React from "react";
import Info from "./components/Info";
import Form from "./components/Form";
import Weather from "./components/Weather";

// мы создаем новый класс который называется App, т.е. компонент, который унаследует все от React.component

const API_KEY = "97840e21ccd1b91596f4e3792a82d35b";

class App extends React.Component {

  state = {
    temp: undefined,
    city: undefined,
    country: undefined,
    pressure: undefined,
    sunset: undefined,
    error: undefined
  }

  //создаем метод, его нужно создавать асинхронно, не нужно, чтобы страница перезагружалась.
  gettingWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const api_url = await fetch (`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
    const data = await api_url.json();
    console.log(data);

    var sunset = data.sys.sunset;
    var date = new Date();
    date.setTime(sunset);
    var sunset_date = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

    if (city) {
      this.setState({
        temp: data.main.temp,
        city: data.name,
        country: data.sys.country,
        pressure: data.main.pressure,
        sunset: sunset_date,
        error: ""
      });
    }

    
  } 


  render () {
    return (
      //return может возвращать только один родительский элемент, поэтому нужно сделать один общий тэг див, например, а в нем куча других дивов
      //мы передаем переменную везерМетод в компонент Форм и в качестве значения this.gettingWeather, this обозначает, что мы обращаемся к этому классу, к этому компоненту и у него берем метод gettingWeather
        <div>
          <Info />
          <Form weatherMethod= {this.gettingWeather} />
          <Weather 
          temp={this.state.temp}
          city={this.state.city}
          country={this.state.country}
          pressure={this.state.pressure}
          sunset={this.state.sunset}
          error={this.state.error}
          />
        </div>

    );
  }
}

export default App;