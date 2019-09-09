const contentNode = document.getElementById('contents');

class IssueFilter extends React.Component {
  render() {
  return (
    <div>
      This is a placeholder for the Issue Filter.
    </div>
    )
  }
};

function IssueTable(props) {
  const mapIssues = props.issueList.map(issue => 
  <IssueRow key={issue.id} issue={issue} />);
  return (
    <table>
      <thead>
      <tr>
          <th>Id</th>
          <th>Status</th>
          <th>Owner</th>
          <th>Created</th>
          <th>Effort</th>
          <th>Completion Date</th>
          <th>Title</th>
      </tr>
      </thead>
      <tbody>
          {mapIssues}
      </tbody>
    </table>
  )
};

const IssueRow = (props) => (
  <tr>
    <td>{props.issue.id}</td>
    <td>{props.issue.status}</td>
    <td>{props.issue.owner}</td>
    <td>{props.issue.created.toDateString()}</td>
    <td>{props.issue.effort}</td>
    <td>{props.issue.completionDate ? props.issue.completionDate.toDateString() : ''}</td>
    <td>{props.issue.title}</td>
  </tr>
);


class IssueAdd extends React.Component {
  constructor() {
    super();
  }

  handlesubmit(e) {
    e.preventDefault();
    this.props.addIssue();
    let form = document.forms.issueAdd;
    form.owner.value = '';
    form.title.value = '';
  }

  render() {
    return (
      <div>
        <form name="issueAdd" onSubmit={this.handlesubmit.bind(this)}>
          <input type="text" name="owner" placeholder="Owner" className="input-1" />
          <input type="text" name="title" placeholder="Title" className="input-2" />
          <button>Add</button>
        </form>
      </div>
    )
  }
};

class IssueList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { issueList: [] };
    this.addIssue = this.addIssue.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    fetch('/api/issues')
    .then(response => response.json())
    .then(data => {
      console.log('Total count of records:', data._metadata.totalCount);
      data.records.forEach(issue => {
        issue.created = new Date(issue.created);
        if (issue.completionDate)
          issue.completionDate = new Date(issue.completionDate);
      });
      this.setState({ issueList: data.records });
    }).catch(err => {
      console.log(err);
    })
  }

  addIssue() {
    let selectInput1 = document.querySelector('.input-1');
    let selectInput2 = document.querySelector('.input-2');
    let newIssue = {
        id: this.state.issueList.length + 1,
        status: 'Open',
        owner: selectInput1.value,
        created: new Date(),
        effort: 0,
        completionDate: '',
        title: selectInput2.value
    };
    this.state.issueList.push(newIssue);
    this.setState({ issueList: this.state.issueList });
  }

  render() {
  return (
    <div>
        <h1>Issue Tracker</h1>
        <IssueFilter />
        <hr />
        <IssueTable issueList={this.state.issueList} />
        <hr />
        <IssueAdd addIssue={this.addIssue} />
    </div>
    )
  }
};

ReactDOM.render(<IssueList />, contentNode);