import { API, graphqlOperation } from 'aws-amplify';
import { onNewVideoUploaded } from '../graphql/subscriptions';
import { message } from 'antd';

export type NotificationData = {
  id: string;
  title: string;
  time: string;
  imgSrc: string;
}

export function subscribeToVideoUploads(setNotifications: React.Dispatch<React.SetStateAction<NotificationData[]>>) {
  return (API.graphql(graphqlOperation(onNewVideoUploaded)) as any).subscribe({
    next: (eventData: any) => {
      const video = eventData.value.data.onNewVideoUploaded;
      const newNotification = {
        id: video.id, 
        title: video.title, 
        time: new Date().toISOString(),
        imgSrc: video.thumbnailUrl 
      };
      setNotifications((prev) => [...prev, newNotification]);

      message.info(`New video uploaded: ${video.title}`);
    },
    error: (error: any) => {
      console.error('Error with subscription: ', error);
    },
  });
}