import data from 'emojibase-data/en/compact.json';
import { toShort } from 'emoji-toolkit';

const mapShortnameToUnicode = [];

data.forEach((item) => {
	mapShortnameToUnicode.push({
		key: toShort(item.unicode),
		value: item.unicode,
	});
	if (item.skins) {
		item.skins.forEach((skin) => {
			mapShortnameToUnicode.push({
				key: toShort(skin.unicode),
				value: skin.unicode,
			});
		});
	}
});

export default function shortnameToUnicode(str) {
	return str.length
		? // We need to use localeCompare because the unicode item may be a utf-16 string
		  mapShortnameToUnicode.find((x) => str.localeCompare(x.key) === 0)
				?.value || ''
		: '';
}
