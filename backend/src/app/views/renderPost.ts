import { renderDeveloper } from '~/app/views/renderDeveloper';
import { PostEntity } from '~/app/models/entity/post';
import { getUrlEnvironment } from '~/utils/url-environment';

export function renderPost(post?: PostEntity) {
  if (!post) {
    return null;
  }

  const { thumbnail: image, author, _count, comments, likes, ...rest } = post;
  const isEmptyImage = !String(image).length;
  const mobile = getUrlEnvironment({ imagePath: image, isMobile: true });
  const web = getUrlEnvironment({ imagePath: image });

  const thumbnail = {
    origin: image,
    web: isEmptyImage ? '' : web,
    mobile: isEmptyImage ? '' : mobile,
  };

  return {
    ...rest,
    comments: _count?.comments ?? 0,
    likes: _count?.likes ?? 0,
    author: author ? renderDeveloper(author) : undefined,
    thumbnail,
  };
}
