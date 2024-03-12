import { createContext, useContext} from "react";
import PropTypes from 'prop-types';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const dummyUsers = [
        {id: 1, Fname: 'JP', Lname: 'Carney', email: 'jp_carney@dlsu.edu.ph', number: 88888888888 },
        {id: 2, Fname: 'Chantal', Lname: 'Sia', email: 'Chantal_sia@dlsu.edu.ph', number: 8888888888},
        {id: 3, Fname: 'David', Lname: 'Brodett', email: 'ram_brodett@dlsu.edu.ph', number: 9218257292},
    ];

    return (
        <UserContext.Provider value={dummyUsers}>
          {children}
        </UserContext.Provider>
      );
    };

    UserProvider.propTypes = {
        children: PropTypes.node.isRequired,
      };
    
// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => useContext(UserContext);