// utils/flagUtils.jsx
import React from 'react';

export const flagEmojiToPNG = (flag) => {
  // Return nothing or original text if input is invalid
  if (typeof flag !== 'string' || flag.length < 2) return flag;

  try {
    const isFlagEmoji = [...flag].every((char) => {
      const cp = char.codePointAt(0);
      return cp >= 0x1f1e6 && cp <= 0x1f1ff; // Regional Indicator Symbols range
    });

    if (!isFlagEmoji) return flag;

    const countryCode = [...flag]
      .map((char) =>
        String.fromCharCode(char.codePointAt(0) - 127397).toLowerCase()
      )
      .join('');

    return (
      <img
        src={`https://flagcdn.com/24x18/${countryCode}.png`}
        alt={`${flag} flag`}
        width="24"
        height="18"
        style={{ verticalAlign: 'middle' }}
      />
    );
  } catch (err) {
    console.error(err);
    return flag;
  }
};
