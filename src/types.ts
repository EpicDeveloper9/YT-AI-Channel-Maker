export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  views: string;
  postedAt: string;
  duration: string;
}

export interface ChannelData {
  name: string;
  handle: string;
  subscribers: string;
  profilePicture: string;
  bannerImage: string;
  description: string;
  videos: Video[];
  isVerified: boolean;
}

export const DEFAULT_CHANNEL: ChannelData = {
  name: "My Awesome Channel",
  handle: "@awesomechannel",
  subscribers: "1.2M",
  profilePicture: "https://picsum.photos/seed/profile/200/200",
  bannerImage: "https://picsum.photos/seed/banner/1500/500",
  description: "Welcome to my channel where I post awesome content!",
  isVerified: true,
  videos: [
    {
      id: "1",
      title: "My First Epic Video!",
      thumbnail: "https://picsum.photos/seed/vid1/640/360",
      views: "250K views",
      postedAt: "2 days ago",
      duration: "10:05"
    },
    {
      id: "2",
      title: "How to build a fake YouTube page",
      thumbnail: "https://picsum.photos/seed/vid2/640/360",
      views: "1.2M views",
      postedAt: "1 week ago",
      duration: "15:20"
    },
    {
      id: "3",
      title: "Vlog #42: The Secret Life of Code",
      thumbnail: "https://picsum.photos/seed/vid3/640/360",
      views: "50K views",
      postedAt: "1 month ago",
      duration: "08:45"
    }
  ]
};
