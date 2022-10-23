import Badge from 'react-bootstrap/Badge';

export default function PackageBadge(props) {
    const { badgeName, ...rest} = props;
    
    const badgeHandler = (flag) => {
        if (flag==='Inspect') {
          return 'warning'
        } else if (flag==='Failed') {
          return 'danger'
        } else if (flag==='Passed' ) {
          return 'success'
        } else {
          return 'dark'
        } 
      }
    return (
        <Badge bg={badgeHandler(badgeName)}>
            {badgeName}
        </Badge>
    )
}