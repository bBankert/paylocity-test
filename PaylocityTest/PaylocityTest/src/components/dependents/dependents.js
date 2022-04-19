import Dependent from './dependent/dependent';

const Dependents = (props) => {


    return (
        <div className="dependents">
            {props.dependents.map((dependent) => (
                <Dependent key={dependent.id} name={dependent.name} type={dependent.type} />
            ))}
        </div>
        )
}

export default Dependents;