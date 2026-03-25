// weatherIcons.ts

import type { IconType } from "react-icons";
import {
  WiDaySunny,
  WiDayCloudy,
  WiCloudy,
  WiFog,
  WiSprinkle,
  WiRain,
  WiDayShowers,
  WiDayStormShowers,
  WiThunderstorm,
  WiSnow,
  WiHail,
} from "react-icons/wi";

export function getWeatherIcon(code: number): IconType {
  switch (true) {
    case code === 0:
    case code === 1:
      return WiDaySunny;

    case code === 2:
      return WiDayCloudy;

    case code === 3:
      return WiCloudy;

    case code === 45:
    case code === 48:
      return WiFog;

    case code >= 51 && code <= 55:
      return WiSprinkle;

    case code >= 61 && code <= 65:
      return WiRain;

    case code === 77:
      return WiHail;

    case code >= 71 && code <= 75:
    case code === 85:
    case code === 86:
      return WiSnow;

    case code === 80:
    case code === 81:
      return WiDayShowers;

    case code === 82:
      return WiDayStormShowers;

    case code >= 95 && code <= 99:
      return WiThunderstorm;

    default:
      return WiDayCloudy;
  }
}
