import { BookmarkIcon, BookmarkSlashIcon } from 'components/Icon';
import { savePost, unSavePost } from 'api/postApi';

import { ToastBarLink } from 'components/OverLay';
import { toast } from 'react-hot-toast';
import { useMutation } from 'react-query';

export const useSavePost = (
	isSaved,
	options = {
		onSuccess: null,
		onError: null,
	},
) => {
	const { onSuccess, onError } = options;
	const queryFn = isSaved ? unSavePost : savePost;
	return useMutation(queryFn, {
		onSuccess: () => {
			onSuccess && onSuccess();
			if (isSaved)
				toast.custom(
					(t) => (
						<ToastBarLink
							t={t}
							to={'/bookmark'}
							message={'Post removed from'}
							linkMessage={'Bookmarks'}
							icon={<BookmarkSlashIcon />}
						/>
					),
					{ position: 'bottom-right' },
				);
			else {
				toast.custom(
					(t) => (
						<ToastBarLink
							t={t}
							to={'/bookmark'}
							message={'Post saved to'}
							linkMessage={'Bookmarks'}
							icon={<BookmarkIcon />}
						/>
					),
					{ position: 'bottom-right' },
				);
			}
		},
		onError: () => {
			onError && onError();
		},
	});
};
