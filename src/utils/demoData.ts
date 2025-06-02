
import { supabase } from "@/integrations/supabase/client";

export interface DemoUser {
  id: string;
  display_name: string;
  bio: string;
  url_slug: string;
  profile_picture_url: string;
  theme_color: string;
  background_type: 'gradient' | 'solid' | 'image';
  background_value: string;
  font_type: 'inter' | 'poppins' | 'roboto' | 'open-sans' | 'playfair';
}

export const demoUsers: DemoUser[] = [
  {
    id: 'demo-ava-torres',
    display_name: 'Ava Torres',
    bio: 'Award-winning director specializing in indie films and documentaries. Passionate about storytelling that changes perspectives.',
    url_slug: 'ava-torres',
    profile_picture_url: 'https://images.unsplash.com/photo-1494790108755-2616b612b789?w=400',
    theme_color: '#e11d48',
    background_type: 'gradient',
    background_value: 'linear-gradient(135deg, #e11d48 0%, #be185d 100%)',
    font_type: 'poppins'
  },
  {
    id: 'demo-liam-chen',
    display_name: 'Liam Chen',
    bio: 'Cinematographer with 8+ years crafting visual narratives. Expert in lighting design and camera movement for emotional storytelling.',
    url_slug: 'liam-chen',
    profile_picture_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    theme_color: '#0ea5e9',
    background_type: 'gradient',
    background_value: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
    font_type: 'inter'
  },
  {
    id: 'demo-jordan-ray',
    display_name: 'Jordan Ray',
    bio: 'Method actor known for intense character transformations. Featured in 12+ independent films and theater productions.',
    url_slug: 'jordan-ray',
    profile_picture_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    theme_color: '#10b981',
    background_type: 'gradient',
    background_value: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    font_type: 'playfair'
  }
];

export const demoProjects = [
  {
    title: 'Rising Shadows',
    description: 'A psychological thriller about memory and identity in the digital age.',
    cover_image_url: 'https://images.unsplash.com/photo-1489599809954-14ae2a84b830?w=800',
    trailer_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    tags: ['thriller', 'indie', 'psychological'],
    owner: 'demo-ava-torres'
  },
  {
    title: 'The Last Letter',
    description: 'An intimate documentary following three generations of women.',
    cover_image_url: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800',
    trailer_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    tags: ['documentary', 'family', 'indie'],
    owner: 'demo-ava-torres'
  },
  {
    title: 'Neon Dreams',
    description: 'Cyberpunk short film exploring themes of connection and isolation.',
    cover_image_url: 'https://images.unsplash.com/photo-1485833077593-4278bba3f11f?w=800',
    trailer_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    tags: ['sci-fi', 'cyberpunk', 'experimental'],
    owner: 'demo-liam-chen'
  },
  {
    title: 'Ocean Depths',
    description: 'Underwater documentary about marine conservation.',
    cover_image_url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
    trailer_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    tags: ['documentary', 'nature', 'conservation'],
    owner: 'demo-liam-chen'
  },
  {
    title: 'Silent Echoes',
    description: 'Drama about a deaf musician finding their voice.',
    cover_image_url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
    trailer_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    tags: ['drama', 'music', 'accessibility'],
    owner: 'demo-jordan-ray'
  },
  {
    title: 'The Painter',
    description: 'Biographical short about a struggling artist in 1960s New York.',
    cover_image_url: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800',
    trailer_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    tags: ['biography', 'art', 'period'],
    owner: 'demo-jordan-ray'
  }
];

export const demoPosts = [
  {
    content: 'Just wrapped filming our latest thriller! The cast and crew were incredible. Can\'t wait to share this story with you all. 🎬✨',
    media_url: 'https://images.unsplash.com/photo-1518715287971-3ca73ca82096?w=600',
    media_type: 'image',
    likes: 42,
    comments: 8,
    user_id: 'demo-ava-torres'
  },
  {
    content: 'Behind the scenes from our documentary shoot. Sometimes the most powerful stories are found in the quiet moments between takes.',
    media_url: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600',
    media_type: 'image',
    likes: 31,
    comments: 5,
    user_id: 'demo-ava-torres'
  },
  {
    content: 'Golden hour magic ✨ There\'s nothing quite like that perfect light to tell a story. Shot with the new ARRI Alexa Mini.',
    media_url: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=600',
    media_type: 'image',
    likes: 58,
    comments: 12,
    user_id: 'demo-liam-chen'
  },
  {
    content: 'Experimenting with underwater cinematography for our ocean documentary. The challenge of shooting in these conditions is what makes it exciting!',
    media_url: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=600',
    media_type: 'image',
    likes: 47,
    comments: 9,
    user_id: 'demo-liam-chen'
  },
  {
    content: 'Character prep for my latest role. Spent weeks learning ASL to authentically portray a deaf musician. The research phase is always my favorite part of the process.',
    media_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600',
    media_type: 'image',
    likes: 73,
    comments: 15,
    user_id: 'demo-jordan-ray'
  },
  {
    content: 'Throwback to filming in the subway tunnels at 3 AM. Independent filmmaking means getting creative with locations and schedules!',
    media_url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600',
    media_type: 'image',
    likes: 29,
    comments: 6,
    user_id: 'demo-jordan-ray'
  }
];

export const createDemoData = async () => {
  try {
    console.log('Creating demo data...');
    
    // Create demo profile builders
    for (const user of demoUsers) {
      const { error: profileError } = await supabase
        .from('profile_builder')
        .upsert({
          user_id: user.id,
          display_name: user.display_name,
          bio: user.bio,
          url_slug: user.url_slug,
          profile_picture_url: user.profile_picture_url,
          theme_color: user.theme_color,
          background_type: user.background_type,
          background_value: user.background_value,
          font_type: user.font_type,
          is_published: true
        });
      
      if (profileError) {
        console.error('Error creating profile:', profileError);
      }
    }

    // Create social links
    const socialLinksData = [
      { profile_id: 'demo-ava-torres', platform: 'instagram', label: '@ava.torres.films', url: 'instagram.com/ava.torres.films', display_order: 0 },
      { profile_id: 'demo-ava-torres', platform: 'website', label: 'Portfolio & Reel', url: 'avatorresfilms.com', display_order: 1 },
      { profile_id: 'demo-liam-chen', platform: 'youtube', label: 'Liam Chen Cinematography', url: 'youtube.com/@liamchencinema', display_order: 0 },
      { profile_id: 'demo-liam-chen', platform: 'website', label: 'Cinematography Reel', url: 'liamchen.camera', display_order: 1 },
      { profile_id: 'demo-jordan-ray', platform: 'imdb', label: 'Jordan Ray - Actor', url: 'imdb.com/name/nm1234567', display_order: 0 },
      { profile_id: 'demo-jordan-ray', platform: 'website', label: 'Acting Portfolio', url: 'jordanrayactor.com', display_order: 1 }
    ];

    for (const link of socialLinksData) {
      const { error: linkError } = await supabase
        .from('social_links')
        .upsert(link);
      
      if (linkError) {
        console.error('Error creating social link:', linkError);
      }
    }

    // Create demo projects
    for (const project of demoProjects) {
      const { error: projectError } = await supabase
        .from('projects')
        .upsert({
          owner_id: project.owner,
          title: project.title,
          description: project.description,
          cover_image_url: project.cover_image_url,
          trailer_url: project.trailer_url,
          tags: project.tags,
          is_public: true
        });
      
      if (projectError) {
        console.error('Error creating project:', projectError);
      }
    }

    // Create demo posts
    for (const post of demoPosts) {
      const { error: postError } = await supabase
        .from('posts')
        .upsert(post);
      
      if (postError) {
        console.error('Error creating post:', postError);
      }
    }

    // Create demo analytics data
    for (const user of demoUsers) {
      // Create view logs
      for (let i = 0; i < 25; i++) {
        const types = ['profile_view', 'project_view', 'link_click'];
        const referrers = ['instagram.com', 'google.com', 'direct'];
        
        const { error: viewError } = await supabase
          .from('view_logs')
          .insert({
            user_id: user.id,
            type: types[Math.floor(Math.random() * types.length)],
            referrer: referrers[Math.floor(Math.random() * referrers.length)]
          });
        
        if (viewError) {
          console.error('Error creating view log:', viewError);
        }
      }

      // Create link clicks
      for (let i = 0; i < 15; i++) {
        const labels = ['Portfolio & Reel', 'Instagram'];
        const urls = ['portfolio.com', 'instagram.com'];
        
        const { error: clickError } = await supabase
          .from('link_clicks')
          .insert({
            user_id: user.id,
            link_label: labels[Math.floor(Math.random() * labels.length)],
            url: urls[Math.floor(Math.random() * urls.length)],
            referrer: 'movcon_profile'
          });
        
        if (clickError) {
          console.error('Error creating link click:', clickError);
        }
      }
    }

    console.log('Demo data created successfully!');
    return { success: true };
  } catch (error) {
    console.error('Error creating demo data:', error);
    return { success: false, error };
  }
};
