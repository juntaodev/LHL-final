import React from 'react';

const StockStarter = () => {
  return (
    <div>
      <div></div>
      <div>

        {/*  */}
        <div tabIndex={0} className="collapse collapse-plus collapse-open border border-base-300 bg-base-100 rounded-box">
          <div className="collapse-title text-xl font-medium">
            Basic
          </div>
          <div className="collapse-content"> 
            <p>A stock, also known as equity, represents a piece of ownership in a company. Units of stock are called “shares”. When you purchase a stock, you are essentially buying a small portion of the company and becoming a shareholder. As the company grows and becomes more valuable, the value of your stock also increases, and you may be able to sell it for a profit. Imagine that your friend owns a bubble tea booth, but he only has $1,000 to start. In order to buy the necessary supplies (e.g., cups, icing, tea), he might raise money from friends and family. Let's pretend that you fund his business $1,000, so he now has $2,000 total and he's able to get the business off the ground. In exchange for your investment, he might agree to give you 50% of the business and its profits, but you would also participate in any losses the business may take. So, one year later, assuming the business is going really well and earns $1000 in profit. The bubble tea booth now is worth $3000 and your 50% stake in the business turns into $1500. Or, one year later, the business is struggling, which costs $1000 in total. The bubble tea booth now is worth $1000 and your 50% shrinks into $500. This is kind of how stocks work, except on a much larger level.</p>
          </div>
        </div>

        {/*  */}
        <div tabIndex={1} className="collapse collapse-plus border border-base-300 bg-base-100 rounded-box">
          <div className="collapse-title text-xl font-medium">
            Intermediate
          </div>
          <div className="collapse-content"> 
            <p>tabIndex={1} attribute is necessary to make the div focusable</p>
          </div>
        </div>

        {/*  */}
        <div tabIndex={2} className="collapse collapse-plus border border-base-300 bg-base-100 rounded-box">
          <div className="collapse-title text-xl font-medium">
            Advanced
          </div>
          <div className="collapse-content"> 
            <p>tabIndex={2} attribute is necessary to make the div focusable</p>
          </div>
        </div>

      </div>
      
    </div>
  )
}

export default StockStarter
