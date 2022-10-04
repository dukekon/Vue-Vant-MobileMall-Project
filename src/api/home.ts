import request from '@/utils/request'

export const getHomeData = () => request.get('index/index')

export type RootObject = RootObjectChild[];

export interface RootObjectChild {
  user: string;
  text: string;
  date: string;
}
