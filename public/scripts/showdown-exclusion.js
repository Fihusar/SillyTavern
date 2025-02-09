import { power_user } from './power-user.js';

// Showdown extension to make chat separators (dinkuses) ignore markdown formatting
export const markdownExclusionExt = () => {
    if (!power_user) {
        console.log("Showdown-dinkus extension: power_user wasn't found! Returning.");
        return []
    }

    let combinedExcludeString = '';
    if (power_user.custom_chat_separator) {
        combinedExcludeString += `${power_user.custom_chat_separator},`;
    }

    if (power_user.markdown_escape_strings) {
        combinedExcludeString += power_user.markdown_escape_strings;
    }

    const escapedExclusions = combinedExcludeString
        .split(",")
        .map((element) => `(${element.split('').map((char) => `\\${char}`).join('')})`);


    // No exclusions? No extension!
    if (!combinedExcludeString || combinedExcludeString.length === 0 || escapedExclusions.length === 0) {
        return [];
    }

    const replaceRegex = new RegExp(`^(${escapedExclusions.join("|")})\n`, "gm");
    return [{
        type: "lang",
        regex: replaceRegex,
        replace: ((match) => match.replace(replaceRegex, `\u0000${match} \n`))
    }];
}
