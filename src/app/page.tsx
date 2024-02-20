"use client"
import Image from "next/image";
import Navbar from "./components/Navbar";
import { useQuery } from "react-query";
import axios from "axios";
import { format, parseISO } from "date-fns";
import Container from "./components/Container";
interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface MainWeatherInfo {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

interface Clouds {
  all: number;
}

interface Wind {
  speed: number;
  deg: number;
  gust: number;
}

interface Sys {
  pod: string;
}

interface WeatherForecast {
  dt: number;
  main: MainWeatherInfo;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  sys: Sys;
  dt_txt: string;
}

interface City {
  id: number;
  name: string;
  coord: { lat: number; lon: number };
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

interface WeatherData {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherForecast[];
  city: City;
}


export default function Home() {
  const { isLoading, error, data } = useQuery<WeatherData>(
    'repoData',
      async () => {
        const { data } = await axios.get(
          `http://api.openweathermap.org/data/2.5/forecast?q=
          Karachi&appid=c9c2f5119b03566d20fab5ae1bce70c1&cnt=2`
        );
      return data;
    }

  )
  const firstData = data?.list[0]
  console.log("data" , data )

  if (isLoading)
   return (
      <div className="flex items-center min-h-screen justify-center">
        <p className="animate-bounce">Loading....</p>
      </div>
    );

  return (
    //http://api.openweathermap.org/data/2.5/forecast?q=Karachi&appid=c9c2f5119b03566d20fab5ae1bce70c1&cnt=2   
    <>
      <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
        <Navbar />
        <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
          {/* today date */}
          <section>
            <div>
              <h2 className="flex gap-1 text-2xl items-end">
                <p>{format(parseISO(firstData?.dt_txt ?? ""), "EEEE")}</p>
                <p className="text-lg">({format(parseISO(firstData?.dt_txt ?? ""), "dd.MM.yyyy")})</p>
              </h2>
              <Container className="gap-10 px-6 item-center">
                <div className="flex flex-col px-4">
                  
                </div>
              </Container>
            </div>

          </section>
          {/* 7 days forecast data  */}
          <section></section>

        </main>
      </div>
    </>
  );
}
