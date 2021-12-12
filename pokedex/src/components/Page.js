// A pagination utility component. Items passed in as a prop
// are assumed to be already formatted appropriately for rendering.
// Each item will be rendered as part of a ListGroup when listing items.

import React from "react";
import { ListGroup, Pagination } from "react-bootstrap"

// Props:
//  - props.items: A list of items to be processed
//  - props.itemsInPageLimit: The number of items allowed on a page
//  - props.mapFn: A map function that will be applied to an item when rendered on the page
class Pages extends React.Component {
  constructor(props) {
    super(props);
    this.state = { curIndex: 0 };
  }

  render() {
    const pageContents = this.props.items.reduce((pages, item) => {
      const recentPage = pages[pages.length - 1];
      recentPage.push(item);
      if (recentPage.length >= this.props.itemsInPageLimit) {
        pages.push([]);
      }
      return pages;
    }, [[]])
    if (pageContents[pageContents.length-1].length === 0) {
      pageContents.pop();
    }
    return <div>
      <div>
        <ListGroup as='ol' numbered>
          {
            (pageContents.length === 0) ? <div></div> :
            pageContents[this.state.curIndex].map((item, index) =>
                this.props.mapFn(item, index)
            )
          }
        </ListGroup>
      </div>
      <div>
      <Pagination>
        <Pagination.First onClick={() => this.setState({ curIndex: 0 })} />
        <Pagination.Prev onClick={() => 
          this.setState((state, _) => ({curIndex: (state.curIndex <= 0) ? 0 : state.curIndex-1}))} />
        {(pageContents.length >= 5) ? <Pagination.Ellipsis /> : null}
        {
          pageContents.map((_, index) =>
              (Math.abs(this.state.curIndex - index) > 2) ? null :
              <Pagination.Item key={index} 
                active={index===this.state.curIndex}
                onClick={() => this.setState({curIndex: index})}
              >{index+1}</Pagination.Item>
          )
        }
        {(pageContents.length >= 5) ? <Pagination.Ellipsis /> : null}
        <Pagination.Next onClick={() => 
          this.setState((state, _) => 
          ({curIndex: (state.curIndex >= pageContents.length-1) ? state.curIndex : state.curIndex+1}))} />
        <Pagination.Last onClick={() => 
          this.setState(({curIndex: pageContents.length-1}))} />
      </Pagination>
      </div>
    </div>
  }
}

export default Pages;