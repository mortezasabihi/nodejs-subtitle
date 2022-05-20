import fs from "fs";
import { parse } from "subtitle";

/**
 * Convert a subtitle file to a JSON file
 * @param {string} subtitlePath - Path to the subtitle file
 * @param {string} outputPath - Path to the output JSON file
 * @returns {Promise<void>}
 */
const convertSubtitleToJSON = (subtitlePath, outputPath) => {
  const phrases = [];

  fs.createReadStream(subtitlePath)
    .pipe(parse())
    .on("data", (subtitle) => {
      phrases.push(subtitle.data);
    })
    .on("end", () => {
      fs.writeFileSync(outputPath, JSON.stringify(phrases, null, 2));
      console.log("Done");
    })
    .on("error", (err) => {
      console.error(err);
      process.exit(1);
    });
};

const SUBTITLE_PATH = `${__dirname}/The.Batman.2022.720p.WEBRip-[YTS.MX].srt`;
const OUTPUT_PATH = `${__dirname}/output.json`;

convertSubtitleToJSON(SUBTITLE_PATH, OUTPUT_PATH);
