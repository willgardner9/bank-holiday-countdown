import Head from "next/head";
import {useState} from "react";
import ShowCountryButton from "../components/showCountryButton";
import {
  countDaysBetweenDateStrings,
  formatDate,
  getDateToday,
} from "../utils/dates";

export default function Home({data}) {
  const {year, month, day} = getDateToday();

  const todaysDate = formatDate(year, month, day);

  const futureBankHolidaysEnglandAndWales = [];
  const futureBankHolidaysNorthernIreland = [];
  const futureBankHolidaysScotland = [];

  const findFutureBankHolidays = () => {
    //england and wales
    for (let i = 0; i < data["england-and-wales"].events.length; i++) {
      if (data["england-and-wales"].events[i].date > todaysDate) {
        futureBankHolidaysEnglandAndWales.push(
          data["england-and-wales"].events[i]
        );
      }
    }
    //northern ireland
    for (let j = 0; j < data["northern-ireland"].events.length; j++) {
      if (data["northern-ireland"].events[j].date > todaysDate) {
        futureBankHolidaysNorthernIreland.push(
          data["northern-ireland"].events[j]
        );
      }
    }
    //scotland
    for (let k = 0; k < data["scotland"].events.length; k++) {
      if (data["scotland"].events[k].date > todaysDate) {
        futureBankHolidaysScotland.push(data["scotland"].events[k]);
      }
    }
  };

  findFutureBankHolidays();

  const nextBankHolidayEnglandWales = futureBankHolidaysEnglandAndWales[0];
  const nextBankHolidayNorthernIreland = futureBankHolidaysNorthernIreland[0];
  const nextBankHolidayScotland = futureBankHolidaysScotland[0];

  const calculateDaysUntilBankHoliday = () => {
    nextBankHolidayEnglandWales.remainingDays = countDaysBetweenDateStrings(
      todaysDate,
      nextBankHolidayEnglandWales.date
    );
    nextBankHolidayNorthernIreland.remainingDays = countDaysBetweenDateStrings(
      todaysDate,
      nextBankHolidayNorthernIreland.date
    );
    nextBankHolidayScotland.remainingDays = countDaysBetweenDateStrings(
      todaysDate,
      nextBankHolidayScotland.date
    );
  };

  calculateDaysUntilBankHoliday();

  const [showEnglandAndWales, setShowEnglandAndWales] = useState(true);
  const [showNorthernIreland, setShowNorthernIreland] = useState(false);
  const [showScotland, setShowScotland] = useState(false);

  const toggleEnglandAndWales = () => {
    setShowEnglandAndWales(true);
    setShowNorthernIreland(false);
    setShowScotland(false);
  };
  const toggleScotland = () => {
    setShowEnglandAndWales(false);
    setShowNorthernIreland(false);
    setShowScotland(true);
  };
  const toggleNorthernIreland = () => {
    setShowEnglandAndWales(false);
    setShowNorthernIreland(true);
    setShowScotland(false);
  };

  return (
    <div className="mx-auto">
      <Head>
        <title>How long is it until the next bank holiday?</title>
        <meta
          name="description"
          content="How long is it until the next bank holiday?"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col items-center mt-12">
        📅
        {showEnglandAndWales && (
          <div className="text-box">
            <h2 className="text-subtitle">
              The next bank holiday in England and Wales is{" "}
              {nextBankHolidayEnglandWales.date}
            </h2>
            <h1 className="text-title">
              {nextBankHolidayEnglandWales.title}
              <span className="text-title-span"> in </span>
              {nextBankHolidayEnglandWales.remainingDays}
              <span className="text-title-span"> days</span>
            </h1>
          </div>
        )}
        {showScotland && (
          <div className="text-box">
            <h2 className="text-subtitle">
              The next bank holiday in Scotland is{" "}
              {nextBankHolidayScotland.date}
            </h2>
            <h1 className="text-title">
              {nextBankHolidayScotland.title}
              <span className="text-title-span"> in </span>
              {nextBankHolidayScotland.remainingDays}
              <span className="text-title-span"> days</span>
            </h1>
          </div>
        )}
        {showNorthernIreland && (
          <div className="text-box">
            <h2 className="text-subtitle">
              The next bank holiday in Northern Ireland is{" "}
              {nextBankHolidayNorthernIreland.date}
            </h2>
            <h1 className="text-title">
              {nextBankHolidayNorthernIreland.title}
              <span className="text-title-span"> in </span>
              {nextBankHolidayNorthernIreland.remainingDays}
              <span className="text-title-span"> days</span>
            </h1>
          </div>
        )}
        <div className="flex mt-4">
          <ShowCountryButton
            text="England and Wales"
            setToggle={() => toggleEnglandAndWales()}
            active={showEnglandAndWales}
          />
          <ShowCountryButton
            text="Scotland"
            setToggle={() => toggleScotland()}
            active={showScotland}
          />
          <ShowCountryButton
            text="Northern Ireland"
            setToggle={() => toggleNorthernIreland()}
            active={showNorthernIreland}
          />
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const data = await fetch("https://www.gov.uk/bank-holidays.json");
  const response = await data.json();

  return {
    props: {
      data: response,
    },
  };
}
