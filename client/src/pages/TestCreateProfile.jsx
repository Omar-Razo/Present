import { useState } from 'react';
import { Form, Link, useNavigate } from 'react-router-dom';
import InputField from '../components/FormStuffs/InputField';
import FormContainer from '../components/FormStuffs/FormContainer';
import { useMutation } from '@apollo/client';
import { CREATE_PROFILE, UPDATE_USER_PREFS } from '../utils/mutations'
import MyButton from '../components/profile/MyButton';
import FormTitle from '../components/FormStuffs/FormTitle';
import TextField from '../components/FormStuffs/TextField';
import GridOfStuff from '../components/FormStuffs/GridOfStuff';
import placeHoldImage from '../assets/images/placeHoldIcon.png';
import ImageIcon from '../components/profile/ImageIcon';
import { SlackLogo } from '@phosphor-icons/react';
import { useEffect } from 'react';
// creating a profile requirements:
// - username (optional: as user types, check value against existing usernames)
// - 1 to 5 flairs to prefer
// - userid (from context)
const MakeProfile = () => {
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);



const visualTags = [
    { tag: "food", image: placeHoldImage},
    { tag: "sports", image: placeHoldImage},
    { tag: "lifestyle", image: placeHoldImage},
    { tag: "news", image: placeHoldImage},
    { tag: "music", image: placeHoldImage},
    { tag: "movies", image: placeHoldImage},
    { tag: "gaming", image: placeHoldImage},
    { tag: "funny", image: placeHoldImage},
    { tag: "animals", image: placeHoldImage},
    { tag: "science", image: placeHoldImage},
    { tag: "technology", image: placeHoldImage},
    { tag: "art", image: placeHoldImage},
    { tag: "books", image: placeHoldImage},
    { tag: "travel", image: placeHoldImage},
    { tag: "photography", image: placeHoldImage}
]


const handleTagClick = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
    
  };

  useEffect(() => {
    if (selectedTags.length > 5) {
        setSelectedTags(selectedTags.slice(1, 6));
      }
    console.log(selectedTags);
  }, [selectedTags]);


const tagElements = visualTags.map((tag, index) => (
    <div className='m-3' key={index} onClick={() => handleTagClick(tag.tag)}>
        {selectedTags.includes(tag.tag)? 
        <div className='border bg-accent-2 rounded-full p-1 m-1' >
        <ImageIcon content={tag.image} size={"small"} shape={"circle"} selected={true}/>
        </div>
        : 
        <div className='border rounded-full p-1 m-1' >
         <ImageIcon content={tag.image} size={"small"} shape={"circle"}/>
         </div>
        }

    </div>
 ));



    const [createProfile] = useMutation(CREATE_PROFILE);
    const [updateUserPrefs] = useMutation(UPDATE_USER_PREFS);
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };
    const handleBioChange = (event) => {
        setBio(event.target.value);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!username || !bio || selectedTags.length === 0) {
            return alert('Missing values!')
        }

        console.log('data to be sent: ', username, bio, selectedTags)
        try {
            const { data: profileData } = await createProfile({
                variables: { username, bio },
            });
            console.log('Profile data: ', profileData)
        } catch (error) {
            console.error('creating profile error: ', error)
        }
    };



    return (
        <FormContainer>
          
                <FormTitle title={"Create Profile"} />

                <div className='flex justify-center'>
                <div className='bkg-white
                h-40 w-40 border rounded-full flex justify-center'>
                    <p className='self-center p-4'>
          placeholder for where the add image will go for profile pic</p>
                </div>
                </div>
               
                <p>Username</p>
                 <InputField
                  placeholder={"what will you go by?"}
                  name={"username"}
                  type={"text"}
                  value={username}
                  onChange={handleUsernameChange}
                  size={"w-full mb-2 "}
                />
                <p>What interests you?</p>
                
     
           

                <GridOfStuff columns={"3"} arrayOfHtml={tagElements} />
                <p>All about you</p>
                <TextField 
                    value={bio}
                    name={'bio'}
                    onChange={handleBioChange} 
                    placeholder={'Share a bit about yourself...'}
                />
                    <MyButton
                        size={"large"}
                        action={handleSubmit}
                        content={<>Submit</>}
                      />
        </FormContainer>
    )
}

export default MakeProfile;