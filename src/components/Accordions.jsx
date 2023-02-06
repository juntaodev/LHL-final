import { Fragment, useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

function Icon({ id, subOpen }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${
        id === subOpen ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

const Accordions = () => {
  const [open, setOpen] = useState(0);
  const [subOpen, setSubOpen] = useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  const handleSubOpen = (value) => {
    setSubOpen(subOpen === value ? 0 : value);
  };

  return (
    <div className="rounded-div my-4">
      {/* <>IF YOU ARE NEW TO STOCK, PLEASE CHECK BELOW.</> */}
    <Fragment>
      {/* basic accordion*/}
      <Accordion open={open === 1} >
        <AccordionHeader onClick={() => handleOpen(1)} className="mt-4 px-2 py-2">
           <strong>Basic</strong> 
        </AccordionHeader>
        <AccordionBody className="px-4">
          {/* another accordion in basic */}

          {/* what is stock */}
          <Accordion open={subOpen === 1} icon={<Icon id={1} subOpen={subOpen} />}>
            <AccordionHeader onClick={() => handleSubOpen(1)}>
              <strong><p> 1. What is stock?</p></strong>
            </AccordionHeader>
            <AccordionBody className="px-4">
             <p>A stock, also known as equity, represents a piece of ownership in a company. Units of stock are called “shares”. When you purchase a stock, you are essentially buying a small portion of the company and becoming a shareholder. As the company grows and becomes more valuable, the value of your stock also increases, and you may be able to sell it for a profit.</p>
             <br/>
             <p>Imagine that your friend owns a bubble tea booth, but he only has $1,000 to start. In order to buy the necessary supplies (e.g., cups, icing, tea), he might raise money from friends and family. Let’s pretend that you fund his business $1,000, so he now has $2,000 total and he’s able to get the business off the ground. In exchange for your investment, he might agree to give you 50% of the business and its profits, but you would also participate in any losses the business may take. So, one year later, assuming the business is going really well and earns $1000 in profit. The bubble tea booth now is worth $3000 and your 50% stake in the business turns into $1500. Or, one year later, the business is struggling, which costs $1000 in total. The bubble tea booth now is worth $1000 and your 50% shrinks into $500. This is kind of how stocks work, except on a much larger level.</p>
            </AccordionBody>
          </Accordion>

          {/* What is the stock market? */}
           <Accordion open={subOpen === 2} icon={<Icon id={2} subOpen={subOpen} />}>
            <AccordionHeader onClick={() => handleSubOpen(2)}>
              <strong><p>2. What is the stock market?</p></strong>
            </AccordionHeader>
            <AccordionBody className="px-4">
             <p>The stock market is a marketplace where stocks (or shares) of companies are bought and sold. It serves as a platform for companies to raise capital by issuing and selling shares to the public, and for investors to buy and sell these shares. The stock market can be thought of as a barometer for the health of the economy, as stock prices are influenced by a variety of factors such as economic growth, interest rates, and company performance. The two most well-known stock markets in the world are the New York Stock Exchange (NYSE) and the NASDAQ. For Canadians, The Toronto Stock Exchange (TSX) is the largest stock exchange in Canada and one of the largest in North America. It is located in Toronto and is home to a wide variety of Canadian-based companies from various industries such as mining, finance, and technology.</p>
            </AccordionBody>
          </Accordion>
          {/*  */}
          <Accordion open={subOpen === 3} icon={<Icon id={3} subOpen={subOpen} />}>
            <AccordionHeader onClick={() => handleSubOpen(3)}>
              <strong><p>3. How does the stock market work?</p></strong>
            </AccordionHeader>
            <AccordionBody className="px-4">
             <p>The stock market serves two important purposes. First, it helps companies raise money, also called “capital”, from the public by offering shares for sale, which can be used to fund and expand their business. Secondly, it gives an investor, who purchases those shares, an opportunity to have a share in the company’s profits.</p>
             <br />
             <p>The stock market operates through a network of exchanges, brokers, and electronic trading systems. To participate in the stock market, an investor must open a brokerage account and place an order to buy or sell a stock. When the order is executed, the broker matches it with another investor who wants to sell or buy the same stock. The price of a stock is determined by supply and demand, meaning that if more people want to buy a stock than sell it, the price will go up, and if more people want to sell a stock than buy it, the price will go down.</p>
             <br />
             <p>It's important to note that the stock market can be volatile and there are inherent risks involved with investing in the stock market. The value of stocks can be influenced by various factors such as economic conditions, company performance, and changes in interest rates. As a result, the stock market can experience ups and downs.</p>
            </AccordionBody>
          </Accordion>
          {/*  */}
          <Accordion open={subOpen === 4} icon={<Icon id={4} subOpen={subOpen} />}>
            <AccordionHeader onClick={() => handleSubOpen(4)}>
              <strong><p>4. Why do people invest in stocks?</p></strong>
            </AccordionHeader>
            <AccordionBody className="px-4">
             <p>Stocks are often considered one of the best investments due to several factors, including:</p>
             <br/>
             <p>Potential for long-term growth: Investing in the stock market can be a way for individuals to grow their wealth over the long term, as the value of stocks has historically increased over time.</p>
             <br />
             <p>Potential for capital appreciation: By buying stocks, investors can potentially earn a profit if they sell the stock at a higher price than they bought it for, which is known as capital appreciation.</p>
             <br />
             <p>Inflation protection: Investing in stocks can help protect against inflation, as the returns generated by stocks may be able to keep pace with the rising cost of goods and services over time.</p>
             <br />
             <p>Dividend income: Many companies pay a portion of their profits to shareholders in the form of dividends, which can provide a steady stream of income for investors.</p>
             <br />
             <p>Diversification: By investing in a variety of stocks, individuals can diversify their portfolios, reducing the risk of loss from any single investment.</p>
             <br />
             <p>It's important to note that investing in the stock market involves risks, and there is no guarantee of a profit. Stock prices can be influenced by various factors such as economic conditions, company performance, and changes in interest rates, and the value of stocks can be volatile.</p>
            </AccordionBody>
          </Accordion>

          <Accordion open={subOpen === 5} icon={<Icon id={5} subOpen={subOpen} />}>
            <AccordionHeader onClick={() => handleSubOpen(5)}>
              <strong><p>5. Different investments and their historical returns</p></strong>
            </AccordionHeader>
            <AccordionBody className="px-4">
             <p>The historical returns of different investments can vary depending on the time frame and specific investment, but here is a general overview:</p>
             <br />
             <p>Stock Market: Historically, the stock market has generated strong returns over the long term, with an average annual return of around 9%-10% in the US and Canada over the last century. However, it's important to note that the stock market can be volatile in the short term and that past performance is not a guarantee of future results.</p>
             <br />
             <p>Bonds: Bonds are generally considered a lower-risk investment compared to stocks, and have historically generated returns in the range of 3-5%. The returns on bonds are typically more stable and predictable than those of stocks, as bonds pay a fixed rate of interest.</p>
             <br />
             <p>Real Estate: Real estate has also generated strong returns over the long term, with some studies indicating an average annual return of around 4-6% in North America. Real estate returns can come from appreciation of property values and rental income. Like the stock market, real estate can also be subject to market fluctuations and changes in local economic conditions.</p>
             <br />
             <p>Commodities: Commodities, such as gold or oil, can also be an investment option. However, the returns on commodities can be more volatile and depend on a variety of factors, including supply and demand and changes in global economic conditions.</p>
           </AccordionBody>
          </Accordion>

          <Accordion open={subOpen === 6} icon={<Icon id={6} subOpen={subOpen} />}>
            <AccordionHeader onClick={() => handleSubOpen(6)}>
              <strong><p>* Before investing in stocks</p></strong>
            </AccordionHeader>
            <AccordionBody className="px-4">
             <p>It's important to consider the following factors:</p>
             <br />
             <p>1. Investment Goals: Determine your investment goals and time horizon. Are you looking to generate income or build wealth over the long term? Understanding your goals will help guide your investment decisions.</p>
             <br />
             <p>2. Risk Tolerance: Consider your personal risk tolerance and be honest about how much risk you're willing to take on. Some stocks may be more volatile than others, and you'll want to be comfortable with the level of risk you're taking on.</p>
             <br />
             <p>3. Market Research: Research the stock market and individual stocks you're interested in investing in. Look at the financial performance of the companies, the industry trends, and the current economic conditions. This information can help you make informed investment decisions..</p>
             <br />
             <p>4. Professional Advice: Consider seeking the advice of a financial advisor or professional who can help you navigate the stock market and make informed investment decisions based on your individual needs and circumstances.</p>
           </AccordionBody>
          </Accordion>

        </AccordionBody>
      </Accordion>

      {/* intermediate accordion*/}
      <Accordion open={open === 2} >
        <AccordionHeader onClick={() => handleOpen(2)} className="my-2 px-2">
          <strong><p>Intermediate</p></strong>
        </AccordionHeader>
        <AccordionBody className="px-4">
          {/* another accordion in intermediate */}

          {/* What is stock market index */}
          <Accordion open={subOpen === 1} icon={<Icon id={1} subOpen={subOpen} />}>
            <AccordionHeader onClick={() => handleSubOpen(1)}>
              <strong><p> 1. What is stock market index?</p></strong>
            </AccordionHeader>
            <AccordionBody className="px-4">
             <p>A stock market index is a statistical measure of the performance of a group of stocks. It is designed to give investors a broad representation of the stock market as a whole, or of a specific market segment.</p>
             <br/>
             <p>The most common type of stock market index is a market capitalization weighted index, which gives greater weight to the larger companies and less weight to the smaller companies. For example, the S&P 500 Index is a market cap weighted index that tracks the performance of 500 large-cap stocks listed on U.S. exchanges.</p>
            </AccordionBody>
          </Accordion>

          {/* Common stock market indexes */}
           <Accordion open={subOpen === 2} icon={<Icon id={2} subOpen={subOpen} />}>
            <AccordionHeader onClick={() => handleSubOpen(2)}>
              <strong><p>2. Common stock market indexes</p></strong>
            </AccordionHeader>
            <AccordionBody className="px-4">
             <p>S&P 500 Index : The S&P 500 Index includes the 500 leading U.S. publicly traded companies, with a primary emphasis on market capitalization. It is one of the most commonly followed equity indices and many investors view it as a representation of the U.S economy.</p>
             <br />
             <p>Dow Jones Industrial Average: The Dow Jones includes 30 U.S headquartered companies. The Dow Jones goal is to represent the U.S economy and its strength. However, it excludes transportation and utility companies. The Dow also only includes stocks that have an excellent reputation, have demonstrated sustained growth, and get most of their revenue from the U.S. Basically, the Dow includes 30 of  the highest quality U.S based companies. For example, the top companies are currently Apple, Microsoft, JP Morgan, Visa, Johnson & Johnson, UnitedHealth, Walmart, Home Depot, Procter & Gamble and Disney.
             </p>
             <br />
             <p>NASDAQ 100 Index: A market capitalization-weighted index that tracks the performance of over 3,000 technology and growth-oriented companies listed on the NASDAQ stock exchange.</p>
             <br />
             <p>S&P/TSX Composite Index: A market capitalization-weighted index that tracks the performance of over 250 companies listed on the Toronto Stock Exchange (TSX). It is the most widely followed stock market index in Canada.</p>
            </AccordionBody>
          </Accordion>

          {/* What is market capitalization? */}
          <Accordion open={subOpen === 3} icon={<Icon id={3} subOpen={subOpen} />}>
            <AccordionHeader onClick={() => handleSubOpen(3)}>
              <strong><p>3. What is market capitalization?</p></strong>
            </AccordionHeader>
            <AccordionBody className="px-4">
             <p>Market capitalization, also market cap, is a measure of the value of a company that is calculated by multiplying the company's stock price by the number of its outstanding shares. Market capitalization is used as a way to gauge the size and value of a publicly traded company, and it is often used to classify companies into categories, such as large cap, mid cap, and small cap.</p>
             <br />
             <p>A company with a high market capitalization is typically considered to be well-established and financially stable, while a company with a low market capitalization is considered to be smaller and potentially more risky. Market capitalization can also be used to evaluate the performance of a company, as well as the overall performance of the stock market.</p>
             <br />
             <p>It's important to note that market capitalization is not a measure of a company's financial performance. Rather, it is a reflection of the perceived value of the company's stock, which can be influenced by a variety of factors, such as investor sentiment, economic conditions, and company-specific news.</p>
            </AccordionBody>
          </Accordion>

          {/* What is the stock price? */}
          <Accordion open={subOpen === 4} icon={<Icon id={4} subOpen={subOpen} />}>
            <AccordionHeader onClick={() => handleSubOpen(4)}>
              <strong><p>4. What is the stock price?</p></strong>
            </AccordionHeader>
            <AccordionBody className="px-4">
             <p>The stock price is the current market value of a share of stock in a publicly traded company. It is determined by supply and demand in the stock market, as buyers and sellers negotiate the price at which they are willing to buy or sell the stock.</p>
             <br />
             <p>The stock price of a company can fluctuate throughout the day and over time, based on a variety of factors, such as the company's financial performance, changes in the economy, and investor sentiment. A stock's price can also be influenced by events such as earnings announcements, major news events, and changes in the company's leadership or strategy.</p>
             <br />
             <p>For investors, the stock price is an important factor to consider when making investment decisions. A higher stock price typically indicates that the company is perceived as being more valuable, while a lower stock price may indicate that the company is perceived as being less valuable or less likely to perform well in the future.
             </p>
            </AccordionBody>
          </Accordion>

          {/* What is shares outstanding? */}
          <Accordion open={subOpen === 5} icon={<Icon id={5} subOpen={subOpen} />}>
            <AccordionHeader onClick={() => handleSubOpen(5)}>
              <strong><p>5. What is shares outstanding?</p></strong>
            </AccordionHeader>
            <AccordionBody className="px-4">
             <p>Shares outstanding refers to the number of shares of a company's stock that are currently owned by investors, including both individual and institutional investors. This figure is an important metric for evaluating a company's financial performance, as it helps to determine the level of ownership that is held by investors and the liquidity of the company's stock.</p>
             <br />
             <p>Shares outstanding can be found in a company's financial statements, typically in its balance sheet or in its annual report. This information is also publicly available from financial data providers and stock exchanges.</p>
             <br />
             <p>It's important to note that shares outstanding can change over time due to various factors, such as the issuance of new shares through stock offerings or the repurchase of existing shares by the company.</p>
           </AccordionBody>
          </Accordion>

          {/* What is financial performance? */}
          <Accordion open={subOpen === 6} icon={<Icon id={6} subOpen={subOpen} />}>
            <AccordionHeader onClick={() => handleSubOpen(6)}>
              <strong><p>6. What is financial performance?</p></strong>
            </AccordionHeader>
            <AccordionBody className="px-4">
             <p>Financial performance refers to how well a company is able to manage its financial resources and meet its financial objectives. This includes a company's ability to generate revenue, control costs, and manage debt, as well as its ability to create value for its shareholders.</p>
             <br />
             <p>To understand a company's financial performance, it's important to review its financial statements, such as its income statement, balance sheet, and cash flow statement. Additionally, it's helpful to compare a company's financial performance to that of its competitors and to the industry as a whole, as well as to review its historical performance over time.</p>
             <br />
             <p>It's important to note that while financial performance is an important factor in evaluating a company's overall health, it is not the only factor that should be considered when making investment decisions. Other factors, such as the company's management team, growth prospects, and competitive advantages, also play a role in determining a company's potential for success.</p>
             <br />
             
           </AccordionBody>
          </Accordion>

           {/* What are financial statements? */}
          <Accordion open={subOpen === 7} icon={<Icon id={7} subOpen={subOpen} />}>
            <AccordionHeader onClick={() => handleSubOpen(7)}>
              <strong><p>7. What are financial statements?</p></strong>
            </AccordionHeader>
            <AccordionBody className="px-4">
             <p>Financial statements are official records that summarize a company's financial activity over a specific period of time, such as a quarter or a year. They provide investors, lenders, and other stakeholders with an overview of a company's financial health and performance. The three main types of financial statements are:</p>
             <br />
             <p>Income Statement: An income statement summarizes a company's revenues and expenses over a specific period of time, and shows its net income or loss.</p>
             <br />
             <p>Balance Sheet: A balance sheet is a snapshot of a company's financial position at a specific point in time, detailing its assets, liabilities, and shareholders' equity.</p>
             <br />
             <p>Cash Flow Statement: A cash flow statement provides information about a company's inflows and outflows of cash, including its operating, investing, and financing activities.</p>
             <br />
             <p>These financial statements are prepared according to generally accepted accounting principles (GAAP) or International Financial Reporting Standards (IFRS) and are audited by an independent third-party auditor to ensure their accuracy. Financial statements are publicly available for most companies and are often published in annual reports or on the company's investor relations website.</p>
             <br />
             <p>Financial statements are an important tool for investors and analysts, as they provide valuable insights into a company's financial performance, such as its revenue growth, profitability, and ability to generate cash flow. They can also be used to calculate various financial ratios, such as price-to-earnings (P/E) ratio, return on equity (ROE), and debt-to-equity ratio, which can provide further insight into a company's financial health.</p>
             
           </AccordionBody>
          </Accordion>

        </AccordionBody>
      </Accordion>

      <Accordion open={open === 3} >
        <AccordionHeader onClick={() => handleOpen(3)} className="mt-2 mb-4 px-2">
          <strong><p>Advanced</p></strong>
        </AccordionHeader>
        <AccordionBody>
          We&apos;re not always in the position that we want to be at.
          We&apos;re constantly growing. We&apos;re constantly making mistakes.
          We&apos;re constantly trying to express ourselves and actualize our
          dreams.
        </AccordionBody>
      </Accordion>
    </Fragment>
    </div>
  )
}

export default Accordions
