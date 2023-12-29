const {
    GoogleSpreadsheet
} = require('google-spreadsheet');
const creds = require('./client_secret.json');
const spreadsheetId = '1XaAU9lZpDKDiYvrf7auZAhFBOo8wIvcbi25KkFPfPtM';

let doc = new GoogleSpreadsheet(spreadsheetId);
let addBalanceSheet;
let statisticsSheet;
let statisticsCalendarSheet;
let memberGrowthSheet;

const months = ["B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M"]

// use service account creds
async function auth() {
    await doc.useServiceAccountAuth(creds);
}


async function load() {
    await doc.loadInfo(); // loads document properties and worksheets
    //console.log(doc.title);

    addBalanceSheet = doc.sheetsByTitle['Banking']; //doc.sheetsByIndex[1]; // or use doc.sheetsById[id]
    statisticsSheet = doc.sheetsByTitle['Statistics']; //doc.sheetsByIndex[2]; // or use doc.sheetsById[id]
    statisticsCalendarSheet = doc.sheetsByTitle['Stats Calendar']; //doc.sheetsByIndex[3]; // or use doc.sheetsById[id]
    memberGrowthSheet = doc.sheetsByTitle['Members']; //doc.sheetsByIndex[4];

    await addBalanceSheet.loadCells();
    await statisticsSheet.loadCells();
    await statisticsCalendarSheet.loadCells();
    await memberGrowthSheet.loadCells();
}

async function addToAddBalance(addedBy, addedTo, amount) {
    let ro = await addBalanceSheet.getRows();
    await addBalanceSheet.loadCells().then(c => {
        ro.every((row, i) => {
            const C = addBalanceSheet.getCell(i, 2),
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
    });
    await addBalanceSheet.saveUpdatedCells();
}

async function addToRemoveBalance(removedBy, removedTo, amount) {
    let ro = await addBalanceSheet.getRows();
    await addBalanceSheet.loadCells().then(c => {
        ro.every((row, i) => {
            const G = addBalanceSheet.getCell(i, 6),
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
    });
    await addBalanceSheet.saveUpdatedCells();
}

// Update all
async function updateAllStats(inputData, totCalendar) {
    await statisticsSheet.loadCells().then(() => {
        const bjCasinoWin = statisticsSheet.getCellByA1('B2'),
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

        const data = [bjCasinoLoss, bjCasinoWin, rouletteCasinoLoss, rouletteCasinoWin, coinCasinoLoss, coinCasinoWin, rollCasinoWin, lotteryCasinoWin, slotCasinoLoss, slotCasinoWin, jackpotCasinoLoss];

        data.forEach((e, i) => {
            let cellValue;
            if (e.value === '' || e.value === null || e.value === undefined) {
                cellValue = 0;
            } else {
                cellValue = e.value;
            }
            e.value = parseInt(cellValue) + parseInt(inputData[i]);
        });
    });
    await statisticsSheet.saveUpdatedCells();
    setTimeout(() => {
        calendarStatistic(totCalendar);
    }, 5 * 1000);
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
async function calendarStatistic(pot) {
    let d = new Date();
    let day = d.getDate();
    let month = d.getMonth();

    const spreadsheetCell = months[month] + (day + 2);

    await statisticsCalendarSheet.loadCells().then(c => {
        const cell = statisticsCalendarSheet.getCellByA1(spreadsheetCell.toString());
        var cellValue;
        if (cell.value === '' || cell.value === null || cell.value === undefined) {
            cellValue = 0;
        } else {
            cellValue = cell.value;
        }
        cell.value = parseInt(cellValue) + parseInt(pot)
        cell.save();
    });
}


//Members
async function increaseMember() {
    let d = new Date();
    let day = d.getDate();
    let month = d.getMonth();

    const spreadsheetCell = months[month] + (day + 2);

    await memberGrowthSheet.loadCells().then(c => {
        const cell = memberGrowthSheet.getCellByA1(spreadsheetCell.toString());
        var cellValue;
        if (cell.value === '' || cell.value === null || cell.value === undefined) {
            cellValue = 0;
        } else {
            cellValue = cell.value
        }
        cell.value = parseInt(cellValue) + 1;
        cell.save();
    })
}

async function decreaseMember() {
    let d = new Date();
    let day = d.getDate();
    let month = d.getMonth();

    const spreadsheetCell = months[month] + (day + 2);

    await memberGrowthSheet.loadCells().then(c => {
        const cell = memberGrowthSheet.getCellByA1(spreadsheetCell.toString());
        var cellValue;
        if (cell.value === '' || cell.value === null || cell.value === undefined) {
            cellValue = 0;
        } else {
            cellValue = cell.value
        }
        cell.value = parseInt(cellValue) - 1;
        cell.save();
    })
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
}