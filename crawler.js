// crawler.js

const { fetchHtml } = require('./requestHandler');
const { extractLinks } = require('./linkExtractor');
const { addUrl, hasVisited } = require('./urlTracker');
const logger = require('./logger')

const RateLimiter = require('./rateLimiter');

const rateLimiter = new RateLimiter(5, 1000); // 5 concurrent requests, 1 second between requests

const crawlPage = async (pageUrl, depth) => {
  if (depth === 0 || hasVisited(pageUrl)) {
    logger.info(`Skipping Page URL : ${pageUrl}`);
    return;
  }

  addUrl(pageUrl);

  await rateLimiter.limit(async () => {
    const html = await fetchHtml(pageUrl);
    if (!html){
      logger.error(`Failed to fetch HTML for ${pageUrl}`);
      return;
    }

    logger.info(`Crawling URL: ${pageUrl}`);

    const links = extractLinks(html, pageUrl);

    for (const link of links) {
      await crawlPage(link, depth - 1);
    }
  });
};


  // const saveResults = () => {
  //   if (argv.outputFormat === 'json') {
  //     fs.writeFileSync(argv.outputFile, JSON.stringify(results, null, 2));
  //   } else if (argv.outputFormat === 'csv') {
  //     const csv = results.map(row => Object.values(row).join(',')).join('\n');
  //     fs.writeFileSync(argv.outputFile, csv);
  //   }
  //   logger.info(`Results saved to ${argv.outputFile}`);
  // };
  
  // crawlPage(argv.startUrl, argv.maxDepth).then(saveResults).catch(error => {
  //   logger.error(`Crawl failed: ${error.message}`);
  // });


const startUrl = 'https://manga4life.com/';
const maxDepth = 2;

crawlPage(startUrl, maxDepth);
