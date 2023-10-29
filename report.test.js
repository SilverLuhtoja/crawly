const { printReport } = require('./report.js');

test('sort array', () => {
  // SETUP
  const consoleSpy = jest.spyOn(console, 'log');
  let pages = {
    third: 3,
    first: 1,
    second: 2,
  };

  //   ACTION
  printReport(pages);

  //  ASSERTION
  expect(consoleSpy.mock.calls[0][0]).toBe('Report is starting');
  expect(consoleSpy.mock.calls[1][0]).toBe('Found 3 internal links to third');
  expect(consoleSpy.mock.calls[2][0]).toBe('Found 2 internal links to second');
  expect(consoleSpy.mock.calls[3][0]).toBe('Found 1 internal links to first');

  // Restore the original console.log method to avoid interference with other tests
  consoleSpy.mockRestore();
});
