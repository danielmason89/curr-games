import React from 'react';
import { FaXbox, FaApple, FaLinux, FaWindows, FaGlobe } from 'react-icons/fa';
import { SiNintendo, SiPlaystation, SiAtari, SiSega } from 'react-icons/si';
import { IoLogoAndroid } from 'react-icons/io';

export type PlatformIconKey =
  | 'pc'
  | 'playstation'
  | 'xbox'
  | 'nintendo'
  | 'ios'
  | 'android'
  | 'mac'
  | 'linux'
  | 'atari'
  | 'sega'
  | 'web';

export type PlatformFamilyKey =
  | 'pc'
  | 'playstation5'
  | 'playstation4'
  | 'playstation3'
  | 'playstation2'
  | 'playstation1'
  | 'ps-vita'
  | 'psp'
  | 'xbox-one'
  | 'xbox-series-x'
  | 'xbox360'
  | 'xbox'
  | 'nintendo-switch'
  | 'nintendo-3ds'
  | 'nintendo-ds'
  | 'nintendo-dsi'
  | 'wii-u'
  | 'wii'
  | 'gamecube'
  | 'nintendo-64'
  | 'game-boy-advance'
  | 'game-boy-color'
  | 'game-boy'
  | 'snes'
  | 'nes'
  | 'ios'
  | 'android'
  | 'macos'
  | 'macintosh'
  | 'apple-ii'
  | 'linux'
  | 'atari-7800'
  | 'atari-5200'
  | 'atari-2600'
  | 'atari-flashback'
  | 'atari-8-bit'
  | 'atari-st'
  | 'atari-lynx'
  | 'atari-xegs'
  | 'genesis'
  | 'sega-saturn'
  | 'sega-cd'
  | 'sega-32x'
  | 'sega-master-system'
  | 'dreamcast'
  | 'game-gear'
  | 'web';

// Maps platform family to icons
export const platformIconMap: Record<PlatformIconKey, React.ReactElement> = {
  pc: <FaWindows />,
  playstation: <SiPlaystation />,
  xbox: <FaXbox />,
  nintendo: <SiNintendo />,
  ios: <FaApple />,
  android: <IoLogoAndroid />,
  mac: <FaApple />,
  linux: <FaLinux />,
  atari: <SiAtari />,
  sega: <SiSega />,
  web: <FaGlobe />,
};

// Maps platform slugs to their platform families
export const platformFamilyMap: Record<PlatformFamilyKey, PlatformIconKey> = {
  pc: 'pc',
  playstation5: 'playstation',
  playstation4: 'playstation',
  playstation3: 'playstation',
  playstation2: 'playstation',
  playstation1: 'playstation',
  'ps-vita': 'playstation',
  psp: 'playstation',
  'xbox-one': 'xbox',
  'xbox-series-x': 'xbox',
  xbox360: 'xbox',
  xbox: 'xbox',
  'nintendo-switch': 'nintendo',
  'nintendo-3ds': 'nintendo',
  'nintendo-ds': 'nintendo',
  'nintendo-dsi': 'nintendo',
  'wii-u': 'nintendo',
  wii: 'nintendo',
  gamecube: 'nintendo',
  'nintendo-64': 'nintendo',
  'game-boy-advance': 'nintendo',
  'game-boy-color': 'nintendo',
  'game-boy': 'nintendo',
  snes: 'nintendo',
  nes: 'nintendo',
  ios: 'mac',
  android: 'android',
  macos: 'mac',
  macintosh: 'mac',
  'apple-ii': 'mac',
  linux: 'linux',
  'atari-7800': 'atari',
  'atari-5200': 'atari',
  'atari-2600': 'atari',
  'atari-flashback': 'atari',
  'atari-8-bit': 'atari',
  'atari-st': 'atari',
  'atari-lynx': 'atari',
  'atari-xegs': 'atari',
  genesis: 'sega',
  'sega-saturn': 'sega',
  'sega-cd': 'sega',
  'sega-32x': 'sega',
  'sega-master-system': 'sega',
  dreamcast: 'sega',
  'game-gear': 'sega',
  web: 'web',
};
