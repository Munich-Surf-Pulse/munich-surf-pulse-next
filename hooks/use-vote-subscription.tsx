import { useEffect } from "react";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import dayjs from "dayjs";
import { SurfLocation, Vote } from "@/types";

interface VoteSubscriptionProps {
  location?: SurfLocation;
  onVoteReceived: (vote: Vote) => void;
  onConnected?: () => void;
  onDisconnected?: () => void;
}

const SUBSCRIPTION_ENDPOINT =
  process.env.NEXT_PUBLIC_WS_ENDPOINT ?? "http://localhost:8080/ws";

export const useVoteSubscription = ({
  location,
  onVoteReceived,
  onConnected,
  onDisconnected,
}: VoteSubscriptionProps) => {
  useEffect(() => {
    const subscription = location ? `/topic/votes/${location}` : "/topic/votes";

    const socket = new SockJS(SUBSCRIPTION_ENDPOINT);
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, () => {
      onConnected?.();
      stompClient.subscribe(subscription, (message) => {
        if (message.body) {
          const vote = JSON.parse(message.body);
          const cleanVote = {
            ...vote,
            unixTimestamp: dayjs(vote.timestamp).unix(),
          };

          onVoteReceived(cleanVote);
        }
      });
    });

    stompClient.onDisconnect = () => {
      console.log("STOMP Client disconnected");
      onDisconnected?.();
    };

    return () => stompClient.disconnect();
  }, []);
};
