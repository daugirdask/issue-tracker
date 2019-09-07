const contentNode = document.getElementById('contents');

const issues = [{
    id: 1, status: 'Open', owner: 'Ravan',
    created: new Date('2016-08-15'), effort: 5, completionDate: undefined,
    title: 'Error in console when clicking Add'
}, {
    id: 2, status: 'Assigned', owner: 'Eddie',
    created: new Date('2016-08-16'), effort: 14,
    completionDate: new Date('2016-08-30'),
    title: 'Missing bottom border on panel'
}];

class IssueFilter extends React.Component {
    render() {
        return React.createElement(
            'div',
            null,
            'This is a placeholder for the Issue Filter.'
        );
    }
};

class IssueTable extends React.Component {
    render() {
        const borderedStyle = { border: "1px solid silver", padding: 6 };
        const mapIssues = issues.map(issue => React.createElement(IssueRow, { key: issue.id, issue: issue }));
        return React.createElement(
            'table',
            { style: { borderCollapse: "collapse" } },
            React.createElement(
                'thead',
                null,
                React.createElement(
                    'tr',
                    null,
                    React.createElement(
                        'th',
                        { style: borderedStyle },
                        'Id'
                    ),
                    React.createElement(
                        'th',
                        { style: borderedStyle },
                        'Status'
                    ),
                    React.createElement(
                        'th',
                        { style: borderedStyle },
                        'Owner'
                    ),
                    React.createElement(
                        'th',
                        { style: borderedStyle },
                        'Created'
                    ),
                    React.createElement(
                        'th',
                        { style: borderedStyle },
                        'Effort'
                    ),
                    React.createElement(
                        'th',
                        { style: borderedStyle },
                        'Completion Date'
                    ),
                    React.createElement(
                        'th',
                        { style: borderedStyle },
                        'Title'
                    )
                )
            ),
            React.createElement(
                'tbody',
                null,
                mapIssues
            )
        );
    }
};

class IssueRow extends React.Component {
    render() {
        const issue = this.props.issue;
        return React.createElement(
            'tr',
            null,
            React.createElement(
                'td',
                null,
                issue.id
            ),
            React.createElement(
                'td',
                null,
                issue.status
            ),
            React.createElement(
                'td',
                null,
                issue.owner
            ),
            React.createElement(
                'td',
                null,
                issue.created.toDateString()
            ),
            React.createElement(
                'td',
                null,
                issue.effort
            ),
            React.createElement(
                'td',
                null,
                issue.completionDate ? issue.completionDate.toDateString() : ''
            ),
            React.createElement(
                'td',
                null,
                issue.title
            )
        );
    }
};

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
        return React.createElement(
            'div',
            null,
            React.createElement(
                'form',
                { name: 'issueAdd', onSubmit: this.handlesubmit.bind(this) },
                React.createElement('input', { type: 'text', name: 'owner', placeholder: 'Owner', className: 'input-1' }),
                React.createElement('input', { type: 'text', name: 'title', placeholder: 'Title', className: 'input-2' }),
                React.createElement(
                    'button',
                    null,
                    'Add'
                )
            )
        );
    }
};

class IssueList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { issueList: [] };
        this.addIssue.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        this.setState({ issueList: issues });
    }

    addIssue() {
        let selectInput1 = document.querySelector('.input-1');
        let selectInput2 = document.querySelector('.input-2');
        let newIssue = {
            id: issues.length + 1,
            status: 'Open',
            owner: selectInput1.value,
            created: new Date(),
            effort: 0,
            completionDate: '',
            title: selectInput2.value
        };
        issues.push(newIssue);
        this.setState({ issueList: newIssue });
    }

    render() {
        return React.createElement(
            'div',
            null,
            React.createElement(
                'h1',
                null,
                'Issue Tracker'
            ),
            React.createElement(IssueFilter, null),
            React.createElement('hr', null),
            React.createElement(IssueTable, null),
            React.createElement('hr', null),
            React.createElement(IssueAdd, { addIssue: this.addIssue.bind(this) })
        );
    }
};

ReactDOM.render(React.createElement(IssueList, null), contentNode);