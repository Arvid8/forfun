"use strict";

var _require = require('google-spreadsheet'),
    GoogleSpreadsheet = _require.GoogleSpreadsheet;

var creds = require('./client_secret.json');

var spreadsheetId = '1XaAU9lZpDKDiYvrf7auZAhFBOo8wIvcbi25KkFPfPtM';
var doc = new GoogleSpreadsheet(spreadsheetId);
var addBalanceSheet;
var statisticsSheet;
var statisticsCalendarSheet;
var memberGrowthSheet;
var months = ["B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M"]; // use service account creds

function auth() {
  return regeneratorRuntime.async(function auth$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(doc.useServiceAccountAuth(creds));

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
}

function load() {
  return regeneratorRuntime.async(function load$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(doc.loadInfo());

        case 2:
          // loads document properties and worksheets
          //console.log(doc.title);
          addBalanceSheet = doc.sheetsByTitle['Banking']; //doc.sheetsByIndex[1]; // or use doc.sheetsById[id]

          statisticsSheet = doc.sheetsByTitle['Statistics']; //doc.sheetsByIndex[2]; // or use doc.sheetsById[id]

          statisticsCalendarSheet = doc.sheetsByTitle['Stats Calendar']; //doc.sheetsByIndex[3]; // or use doc.sheetsById[id]

          memberGrowthSheet = doc.sheetsByTitle['Members']; //doc.sheetsByIndex[4];

          _context2.next = 8;
          return regeneratorRuntime.awrap(addBalanceSheet.loadCells());

        case 8:
          _context2.next = 10;
          return regeneratorRuntime.awrap(statisticsSheet.loadCells());

        case 10:
          _context2.next = 12;
          return regeneratorRuntime.awrap(statisticsCalendarSheet.loadCells());

        case 12:
          _context2.next = 14;
          return regeneratorRuntime.awrap(memberGrowthSheet.loadCells());

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function addToAddBalance(addedBy, addedTo, amount) {
  var ro;
  return regeneratorRuntime.async(function addToAddBalance$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(addBalanceSheet.getRows());

        case 2:
          ro = _context3.sent;
          _context3.next = 5;
          return regeneratorRuntime.awrap(addBalanceSheet.loadCells().then(function (c) {
            ro.every(function (row, i) {
              var C = addBalanceSheet.getCell(i, 2),
                  D = addBalanceSheet.getCell(i, 3),
                  E = addBalanceSheet.getCell(i, 4);

              if (C.value === null && D.value === null && E.value === null) {
                C.value = addedBy;
                D.value = addedTo;
                E.value = amount;
                return false;
              }

              return true;
            });
          }));

        case 5:
          _context3.next = 7;
          return regeneratorRuntime.awrap(addBalanceSheet.saveUpdatedCells());

        case 7:
        case "end":
          return _context3.stop();
      }
    }
  });
}

function addToRemoveBalance(removedBy, removedTo, amount) {
  var ro;
  return regeneratorRuntime.async(function addToRemoveBalance$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(addBalanceSheet.getRows());

        case 2:
          ro = _context4.sent;
          _context4.next = 5;
          return regeneratorRuntime.awrap(addBalanceSheet.loadCells().then(function (c) {
            ro.every(function (row, i) {
              var G = addBalanceSheet.getCell(i, 6),
                  H = addBalanceSheet.getCell(i, 7),
                  I = addBalanceSheet.getCell(i, 8);

              if (G.value === null && H.value === null && I.value === null) {
                G.value = removedBy;
                H.value = removedTo;
                I.value = amount;
                return false;
              }

              return true;
            });
          }));

        case 5:
          _context4.next = 7;
          return regeneratorRuntime.awrap(addBalanceSheet.saveUpdatedCells());

        case 7:
        case "end":
          return _context4.stop();
      }
    }
  });
} // Update all


function updateAllStats(inputData, totCalendar) {
  return regeneratorRuntime.async(function updateAllStats$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(statisticsSheet.loadCells().then(function () {
            var bjCasinoWin = statisticsSheet.getCellByA1('B2'),
                bjCasinoLoss = statisticsSheet.getCellByA1('C2'),
                rouletteCasinoWin = statisticsSheet.getCellByA1('B3'),
                rouletteCasinoLoss = statisticsSheet.getCellByA1('C3'),
                coinCasinoWin = statisticsSheet.getCellByA1('B4'),
                coinCasinoLoss = statisticsSheet.getCellByA1('C4'),
                rollCasinoWin = statisticsSheet.getCellByA1('D5'),
                lotteryCasinoWin = statisticsSheet.getCellByA1('D6'),
                slotCasinoWin = statisticsSheet.getCellByA1('B8'),
                slotCasinoLoss = statisticsSheet.getCellByA1('C8'),
                jackpotCasinoLoss = statisticsSheet.getCellByA1('C9');
            var data = [bjCasinoLoss, bjCasinoWin, rouletteCasinoLoss, rouletteCasinoWin, coinCasinoLoss, coinCasinoWin, rollCasinoWin, lotteryCasinoWin, slotCasinoLoss, slotCasinoWin, jackpotCasinoLoss];
            data.forEach(function (e, i) {
              var cellValue;

              if (e.value === '' || e.value === null || e.value === undefined) {
                cellValue = 0;
              } else {
                cellValue = e.value;
              }

              e.value = parseInt(cellValue) + parseInt(inputData[i]);
            });
          }));

        case 2:
          _context5.next = 4;
          return regeneratorRuntime.awrap(statisticsSheet.saveUpdatedCells());

        case 4:
          setTimeout(function () {
            calendarStatistic(totCalendar);
          }, 5 * 1000);

        case 5:
        case "end":
          return _context5.stop();
      }
    }
  });
}
/*
//Blackjack
async function statBlackJackCasinoWin(pot) {
    await statisticsSheet.loadCells().then(c => {
        const cell = statisticsSheet.getCellByA1('B2');
        var cellValue;
        if (cell.value === '' || cell.value === null || cell.value === undefined) {
            cellValue = 0;
        } else {
            cellValue = cell.value
        }
        cell.value = parseInt(cellValue) + parseInt(pot)
        cell.save();
    })
    calendarStatistic(pot);
}

async function statBlackJackCasinoLoss(pot) {
    await statisticsSheet.loadCells().then(c => {
        const cell = statisticsSheet.getCellByA1('C2');
        var cellValue;
        if (cell.value === '' || cell.value === null || cell.value === undefined) {
            cellValue = 0;
        } else {
            cellValue = cell.value
        }
        cell.value = parseInt(cellValue) + parseInt(pot)
        cell.save();
    })
    const realLoss = (parseInt(pot) * 0.95) * (-1);
    calendarStatistic(realLoss);
}


//Roulette
async function statRouletteCasinoWin(pot) {
    await statisticsSheet.loadCells().then(c => {
        const cell = statisticsSheet.getCellByA1('B3');
        var cellValue;
        if (cell.value === '' || cell.value === null || cell.value === undefined) {
            cellValue = 0;
        } else {
            cellValue = cell.value
        }
        cell.value = parseInt(cellValue) + parseInt(pot)
        cell.save();
    })
    calendarStatistic(pot);
}

async function statRouletteCasinoLoss(pot) {
    await statisticsSheet.loadCells().then(c => {
        const cell = statisticsSheet.getCellByA1('C3');
        var cellValue;
        if (cell.value === '' || cell.value === null || cell.value === undefined) {
            cellValue = 0;
        } else {
            cellValue = cell.value
        }
        cell.value = parseInt(cellValue) + parseInt(pot)
        cell.save();
    })
    const realLoss = (parseInt(pot) * 0.92) * (-1);
    calendarStatistic(realLoss);
}


//Coin Flip
async function statCoinFlipCasinoWin(pot) {
    await statisticsSheet.loadCells().then(c => {
        const cell = statisticsSheet.getCellByA1('B4');
        var cellValue;
        if (cell.value === '' || cell.value === null || cell.value === undefined) {
            cellValue = 0;
        } else {
            cellValue = cell.value
        }
        cell.value = parseInt(cellValue) + parseInt(pot)
        cell.save();
    })
    calendarStatistic(pot);
}

async function statCoinFlipCasinoLoss(pot) {
    await statisticsSheet.loadCells().then(c => {
        const cell = statisticsSheet.getCellByA1('C4');
        var cellValue;
        if (cell.value === '' || cell.value === null || cell.value === undefined) {
            cellValue = 0;
        } else {
            cellValue = cell.value
        }
        cell.value = parseInt(cellValue) + parseInt(pot)
        cell.save();
    })
    const realLoss = (parseInt(pot) * 0.92) * (-1);
    calendarStatistic(realLoss);
}

async function statCoinFlipPvP(pot) {
    await statisticsSheet.loadCells().then(c => {
        const cell = statisticsSheet.getCellByA1('D4');
        var cellValue;
        if (cell.value === '' || cell.value === null || cell.value === undefined) {
            cellValue = 0;
        } else {
            cellValue = cell.value
        }
        cell.value = parseInt(cellValue) + parseInt(pot)
        cell.save();
    })
    const realLoss = (parseInt(pot) * 0.92) * (-1);
    calendarStatistic(realLoss);
}


//Roll
async function statRollPvP(pot) {
    await statisticsSheet.loadCells().then(c => {
        const cell = statisticsSheet.getCellByA1('D5');
        var cellValue;
        if (cell.value === '' || cell.value === null || cell.value === undefined) {
            cellValue = 0;
        } else {
            cellValue = cell.value
        }
        cell.value = parseInt(cellValue) + parseInt(pot)
        cell.save();
    })
    const realLoss = parseInt(pot) * 0.08;
    calendarStatistic(realLoss);
}


//Lottery
async function statLotteryPvP(pot) {
    await statisticsSheet.loadCells().then(c => {
        const cell = statisticsSheet.getCellByA1('D6');
        var cellValue;
        if (cell.value === '' || cell.value === null || cell.value === undefined) {
            cellValue = 0;
        } else {
            cellValue = cell.value
        }
        cell.value = parseInt(cellValue) + parseInt(pot)
        cell.save();
    })
    const realLoss = (parseInt(pot) * 0.85) * (-1);
    calendarStatistic(realLoss);
}


//Golden Slot
async function statGoldenSlotCasinoWin(pot) {
    await statisticsSheet.loadCells().then(c => {
        const cell = statisticsSheet.getCellByA1('B8');
        var cellValue;
        if (cell.value === '' || cell.value === null || cell.value === undefined) {
            cellValue = 0;
        } else {
            cellValue = cell.value
        }
        cell.value = parseInt(cellValue) + parseInt(pot)
        cell.save();
    })
    calendarStatistic(pot);
}

async function statGoldenSlotCasinoLoss(pot) {
    await statisticsSheet.loadCells().then(c => {
        const cell = statisticsSheet.getCellByA1('C8');
        var cellValue;
        if (cell.value === '' || cell.value === null || cell.value === undefined) {
            cellValue = 0;
        } else {
            cellValue = cell.value
        }
        cell.value = parseInt(cellValue) + parseInt(pot)
        cell.save();
    })
    pot = (-1) * parseInt(pot);
    calendarStatistic(pot);
}


//Jackpots
async function statJackPotsCasinoLoss(pot) {
    await statisticsSheet.loadCells().then(c => {
        const cell = statisticsSheet.getCellByA1('C9');
        var cellValue;
        if (cell.value === '' || cell.value === null || cell.value === undefined) {
            cellValue = 0;
        } else {
            cellValue = cell.value
        }
        cell.value = parseInt(cellValue) + parseInt(pot)
        cell.save();
    })
    pot = (-1) * parseInt(pot);
    calendarStatistic(pot);
}
*/
//Stat Calendar


function calendarStatistic(pot) {
  var d, day, month, spreadsheetCell;
  return regeneratorRuntime.async(function calendarStatistic$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          d = new Date();
          day = d.getDate();
          month = d.getMonth();
          spreadsheetCell = months[month] + (day + 2);
          _context6.next = 6;
          return regeneratorRuntime.awrap(statisticsCalendarSheet.loadCells().then(function (c) {
            var cell = statisticsCalendarSheet.getCellByA1(spreadsheetCell.toString());
            var cellValue;

            if (cell.value === '' || cell.value === null || cell.value === undefined) {
              cellValue = 0;
            } else {
              cellValue = cell.value;
            }

            cell.value = parseInt(cellValue) + parseInt(pot);
            cell.save();
          }));

        case 6:
        case "end":
          return _context6.stop();
      }
    }
  });
} //Members


function increaseMember() {
  var d, day, month, spreadsheetCell;
  return regeneratorRuntime.async(function increaseMember$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          d = new Date();
          day = d.getDate();
          month = d.getMonth();
          spreadsheetCell = months[month] + (day + 2);
          _context7.next = 6;
          return regeneratorRuntime.awrap(memberGrowthSheet.loadCells().then(function (c) {
            var cell = memberGrowthSheet.getCellByA1(spreadsheetCell.toString());
            var cellValue;

            if (cell.value === '' || cell.value === null || cell.value === undefined) {
              cellValue = 0;
            } else {
              cellValue = cell.value;
            }

            cell.value = parseInt(cellValue) + 1;
            cell.save();
          }));

        case 6:
        case "end":
          return _context7.stop();
      }
    }
  });
}

function decreaseMember() {
  var d, day, month, spreadsheetCell;
  return regeneratorRuntime.async(function decreaseMember$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          d = new Date();
          day = d.getDate();
          month = d.getMonth();
          spreadsheetCell = months[month] + (day + 2);
          _context8.next = 6;
          return regeneratorRuntime.awrap(memberGrowthSheet.loadCells().then(function (c) {
            var cell = memberGrowthSheet.getCellByA1(spreadsheetCell.toString());
            var cellValue;

            if (cell.value === '' || cell.value === null || cell.value === undefined) {
              cellValue = 0;
            } else {
              cellValue = cell.value;
            }

            cell.value = parseInt(cellValue) - 1;
            cell.save();
          }));

        case 6:
        case "end":
          return _context8.stop();
      }
    }
  });
}

function setupSpreadSheet() {
  auth();
  load();
  console.log("SpreadSheets ON");
}

module.exports = {
  setup: setupSpreadSheet,
  addToAddBalance: addToAddBalance,
  addToRemoveBalance: addToRemoveBalance,
  updateAllStats: updateAllStats,

  /*
      statBlackJackCasinoWin: statBlackJackCasinoWin,
      statBlackJackCasinoLoss: statBlackJackCasinoLoss,
        statRouletteCasinoWin: statRouletteCasinoWin,
      statRouletteCasinoLoss: statRouletteCasinoLoss,
        statCoinFlipCasinoWin: statCoinFlipCasinoWin,
      statCoinFlipCasinoLoss: statCoinFlipCasinoLoss,
      statCoinFlipPvP: statCoinFlipPvP,
        statRollPvP: statRollPvP,
        statLotteryPvP: statLotteryPvP,
        statGoldenSlotCasinoWin: statGoldenSlotCasinoWin,
      statGoldenSlotCasinoLoss: statGoldenSlotCasinoLoss,
        statJackPotsCasinoLoss: statJackPotsCasinoLoss,
  */
  calendarStatistic: calendarStatistic,
  increaseMember: increaseMember,
  decreaseMember: decreaseMember
};