import { getUrlEnvironment } from '~/utils/url-environment';
import { DeveloperEntity } from '~/app/models/entity/developer';
import { renderPost } from '~/app/views/renderPost';

export function renderDeveloper(developer?: DeveloperEntity | null) {
  if (!developer) {
    return null;
  }

  const { password: _, avatar_url: image, posts, ...rest } = developer;
  const isEmptyImage = !String(image).length;
  const mobile = getUrlEnvironment({ imagePath: image, isMobile: true });
  const web = getUrlEnvironment({ imagePath: image });

  const avatar_url = {
    origin: image,
    web: isEmptyImage ? '' : web,
    mobile: isEmptyImage ? '' : mobile,
  };

  return {
    ...rest,
    avatar_url,
    posts: posts ? posts.map(renderPost) : undefined,
  };
}
