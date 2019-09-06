const contentNode = document.getElementById('contents');

const issues = [
    {
        id: 1, status: 'Open', owner: 'Ravan',
        created: new Date('2016-08-15'), effort: 5, completionDate: undefined,
        title: 'Error in console when clicking Add',
    },
    {
        id: 2, status: 'Assigned', owner: 'Eddie',
        created: new Date('2016-08-16'), effort: 14,
        completionDate: new Date('2016-08-30'),
        title: 'Missing bottom border on panel',
    }
];

class IssueFilter extends React.Component {
    render() {
    return (
        <div>This is a placeholder for the Issue Filter.</div>
        )
    }
};

class IssueTable extends React.Component {
    render() {
    const borderedStyle = {border: "1px solid silver", padding: 6};
    const mapIssues = issues.map(issue => 
    <IssueRow key={issue.id} issue={issue} />);
    return (
        <table style={{borderCollapse: "collapse"}}>
            <thead>
                <tr>
                    <th style={borderedStyle}>Id</th>
                    <th style={borderedStyle}>Status</th>
                    <th style={borderedStyle}>Owner</th>
                    <th style={borderedStyle}>Created</th>
                    <th style={borderedStyle}>Effort</th>
                    <th style={borderedStyle}>Completion Date</th>
                    <th style={borderedStyle}>Title</th>
                </tr>
            </thead>
            <tbody>
                {mapIssues}
            </tbody>
        </table>
        )
    }
};

class IssueRow extends React.Component {
    render() {
    const issue = this.props.issue;
    return (
        <tr>
            <td>{issue.id}</td>
            <td>{issue.status}</td>
            <td>{issue.owner}</td>
            <td>{issue.created.toDateString()}</td>
            <td>{issue.effort}</td>
            <td>{issue.completionDate ? issue.completionDate.toDateString() : ''}</td>
            <td>{issue.title}</td>
        </tr>
        )
    }
};


class IssueAdd extends React.Component {
    render() {
        return (
            <div>
                <input className="inputValue"></input>
                <button>Add</button>
            </div>
        )
    }
};

class IssueList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { issueList: issues };
        setTimeout(this.testIssue.bind(this), 200);
    }

    testIssue() {
        let selectInput = document.querySelector('.inputValue');
        let newIssue = {
            id: 0,
            status: 'Open',
            owner: 'Test',
            created: new Date(),
            effort: 0,
            completionDate: '',
            title: selectInput.value
        }
        issues.push(newIssue);
        this.setState({ issueList: newIssue })
        console.log(this.state.issueList);
    }

    render() {
    return (
        <div>
            <h1>Issue Tracker</h1>
            <IssueFilter />
            <hr />
            <IssueTable />
            <hr />
            <IssueAdd />
        </div>
        )
    }
};


ReactDOM.render(<IssueList />, contentNode);