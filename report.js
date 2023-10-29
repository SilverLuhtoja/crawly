function printReport(pages) {
  console.log('Report is starting');
  let pagesArray = Object.entries(pages);
  pagesArray.sort((a, b) => b[1] - a[1]);
  let sortedPages = Object.fromEntries(pagesArray);

  for (let [url, count] of Object.entries(sortedPages)) {
    console.log(`Found ${count} internal links to ${url}`);
  }
}

module.exports = {
  printReport,
};
