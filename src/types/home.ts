export interface IndexData {
  banner: Banner[]
  // channel: Channel[]
  // newGoodsList: NewGoodsList[]
  // hotGoodsList: HotGoodsList[]
  // brandList: BrandList[]
  // topicList: TopicList[]
  // categoryList: CategoryList[]
}

export interface Banner {
  id: number
  ad_position_id: number
  media_type: number
  name: string
  link: string
  image_url: string
  content: string
  end_time: number
  enabled: number
}

export interface Channel {
  id: number
  name: string
  url: string
  icon_url: string
  sort_order: number
}

export interface NewGoodsList {
  id: number
  name: string
  list_pic_url: string
  retail_price: number
}

export interface HotGoodsList {
  id: number
  name: string
  list_pic_url: string
  retail_price: number
  goods_brief: string
}

export interface BrandList {
  id: number
  name: string
  list_pic_url: string
  simple_desc: string
  pic_url: string
  sort_order: number
  is_show: number
  floor_price: number
  app_list_pic_url: string
  is_new: number
  new_pic_url: string
  new_sort_order: number
}

export interface TopicList {
  id: number
  title: string
  content: string
  avatar: string
  item_pic_url: string
  subtitle: string
  topic_category_id: number
  price_info: number
  read_count: string
  scene_pic_url: string
  topic_template_id: number
  topic_tag_id: number
  sort_order: number
  is_show: number
}

export interface CategoryListGoodsList {
  id: number
  name: string
  list_pic_url: string
  retail_price: number
}

export interface CategoryList {
  id: number
  name: string
  goodsList: CategoryListGoodsList[]
}
