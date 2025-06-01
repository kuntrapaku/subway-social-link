
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface CreateNotificationParams {
  userId: string;
  type: 'follow' | 'invite' | 'comment' | 'like' | 'mention' | 'connection';
  message: string;
  link?: string;
  actorUserId?: string;
  targetId?: string;
  targetType?: string;
}

export const createNotification = async (params: CreateNotificationParams) => {
  try {
    const { data, error } = await supabase
      .from('notifications')
      .insert({
        user_id: params.userId,
        type: params.type,
        message: params.message,
        link: params.link,
        actor_user_id: params.actorUserId,
        target_id: params.targetId,
        target_type: params.targetType,
      });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating notification:', error);
    throw error;
  }
};

// Helper functions for common notification types
export const notifyUserFollowed = async (followedUserId: string, followerUserId: string, followerName: string) => {
  return createNotification({
    userId: followedUserId,
    type: 'follow',
    message: `${followerName} started following you`,
    link: `/profile/${followerName.toLowerCase().replace(' ', '-')}`,
    actorUserId: followerUserId,
    targetType: 'user'
  });
};

export const notifyPostLiked = async (postOwnerId: string, likerUserId: string, likerName: string, postId: string) => {
  return createNotification({
    userId: postOwnerId,
    type: 'like',
    message: `${likerName} liked your post`,
    link: `/posts/${postId}`,
    actorUserId: likerUserId,
    targetId: postId,
    targetType: 'post'
  });
};

export const notifyPostCommented = async (postOwnerId: string, commenterUserId: string, commenterName: string, postId: string) => {
  return createNotification({
    userId: postOwnerId,
    type: 'comment',
    message: `${commenterName} commented on your post`,
    link: `/posts/${postId}`,
    actorUserId: commenterUserId,
    targetId: postId,
    targetType: 'post'
  });
};

export const notifyUserMentioned = async (mentionedUserId: string, mentionerUserId: string, mentionerName: string, postId: string) => {
  return createNotification({
    userId: mentionedUserId,
    type: 'mention',
    message: `${mentionerName} mentioned you in a comment`,
    link: `/posts/${postId}`,
    actorUserId: mentionerUserId,
    targetId: postId,
    targetType: 'post'
  });
};

export const notifyProjectInvite = async (invitedUserId: string, inviterUserId: string, inviterName: string, projectName: string, projectId: string) => {
  return createNotification({
    userId: invitedUserId,
    type: 'invite',
    message: `You were invited to join "${projectName}"`,
    link: `/projects/${projectId}`,
    actorUserId: inviterUserId,
    targetId: projectId,
    targetType: 'project'
  });
};
