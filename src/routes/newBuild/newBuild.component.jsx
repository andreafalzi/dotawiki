import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../component/button/button.component';

import { BuildContext } from '../../context/build.context';
import { ItemsContext } from '../../context/items.context';
import { HeroesContext } from '../../context/heroes.context';

import { MdExposurePlus1, MdDelete } from 'react-icons/md';
import { v4 as uuid } from 'uuid';
import './newBuild.style.scss';
import { SelectBox } from '../../component/select_box/select_box.component';
import { SearchBox } from '../../component/search_box/search_box.component';

export const NewBuild = () => {
  const [builds, setBuilds] = useContext(BuildContext);
  const [itemsStates] = useContext(ItemsContext);
  const [heroesStates] = useContext(HeroesContext);
  let navigate = useNavigate();
  const unique_id = uuid();
  const small_id = unique_id.slice(0, 4);

  const filteredItemsStateOnlyName = [];
  itemsStates.forEach((item) => {
    filteredItemsStateOnlyName.push({ id: item.id, value: item.dname, text: item.dname });
  });

  const filteredHeroesStateOnlyName = [];
  heroesStates.forEach((hero) => {
    filteredHeroesStateOnlyName.push({ id: hero.id, value: hero.localized_name, text: hero.localized_name });
  });

  const defaultForm = {
    name: '',
  };

  const defaultSelection = {
    hero: '',
    early: '',
    mid: '',
    late: '',
    optional: '',
  };

  const submitForm = {
    id: '',
    name: '',
    hero: '',
    items: {
      early: [],
      mid: [],
      late: [],
      optional: [],
    },
  };
  const fillSubmitForm = (submitForm) => {
    submitForm.id = small_id;
    submitForm.name = formFields.name;
    submitForm.hero = formFields.hero;
    submitForm.items.early = earlyArr;
    submitForm.items.mid = midArr;
    submitForm.items.late = lateArr;
    submitForm.items.optional = optionalArr;
  };

  const [formFields, setFormFields] = useState(defaultForm);
  const [earlyArr, setEarlyArr] = useState([]);
  const [midArr, setMidArr] = useState([]);
  const [lateArr, setLateArr] = useState([]);
  const [optionalArr, setOptionalArr] = useState([]);
  const [selected, setSelected] = useState(defaultSelection);

  // const handleChange = (event) => {
  //   const { name, value } = event.target;

  //   setFormFields({ ...formFields, [name]: value });
  // };
  const handleSelected = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
    setSelected({ ...selected, [name]: value });
  };

  const addValue = (event) => {
    event.preventDefault();

    //.currentTarget to work with imported Icons from Icons-React
    const { name, value } = event.currentTarget;

    if (value !== '') {
      switch (name) {
        case 'early':
          setEarlyArr([...earlyArr, { id: small_id, value: value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() }]);
          break;

        case 'mid':
          setMidArr([...midArr, { id: small_id, value: value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() }]);
          break;

        case 'late':
          setLateArr([...lateArr, { id: small_id, value: value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() }]);
          break;

        case 'optional':
          setOptionalArr([...optionalArr, { id: small_id, value: value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() }]);
          break;

        default:
          break;
      }
    }
  };

  const removeValue = (id, name) => {
    let newList = undefined;

    switch (name) {
      case 'early':
        newList = earlyArr.filter((item) => item.id !== id);
        setEarlyArr(newList);
        break;

      case 'mid':
        newList = midArr.filter((item) => item.id !== id);
        setMidArr(newList);
        break;

      case 'late':
        newList = lateArr.filter((item) => item.id !== id);
        setLateArr(newList);
        break;

      case 'optional':
        newList = optionalArr.filter((item) => item.id !== id);
        setOptionalArr(newList);
        break;

      default:
        break;
    }
  };

  const resetDefault = (event) => {
    event.preventDefault();
    setFormFields(defaultForm);
    setSelected(defaultSelection);
    setEarlyArr([]);
    setMidArr([]);
    setLateArr([]);
    setOptionalArr([]);
  };

  const handleBuildSubmit = (event) => {
    event.preventDefault();
    if (formFields.name === '' || selected.hero === '') {
      alert('Name and Hero cannot be empty');
    } else {
      fillSubmitForm(submitForm);
      setBuilds([...builds, submitForm]);
      navigate('/builds');
    }
  };

  const { name } = formFields;
  const { hero, early, mid, late, optional } = selected;
  return (
    <div className='container'>
      <h1>New Build</h1>
      <Link to='/builds'>
        <Button>Back to Builds</Button>
      </Link>
      <div className='new_build_container'>
        <div className='form_new_build'>
          <h3>Builder</h3>
          <div className='form_new_build_section'>
            <SearchBox labelName='name' type='text' name='name' onChange={handleSelected} value={name}>
              Name
            </SearchBox>
          </div>
          <div className='form_new_build_section'>
            <SelectBox type='text' emptyOption={true} emptyOptionText='Select your Hero' options={filteredHeroesStateOnlyName} name='hero' onChange={handleSelected} value={hero}>
              Choose your hero
            </SelectBox>
          </div>
          <div className='form_new_build_section'>
            <SelectBox type='text' emptyOption={true} emptyOptionText='Select your Item' options={filteredItemsStateOnlyName} name='early' onChange={handleSelected} value={early}>
              Choose early game items (multiple choices)
            </SelectBox>
            <div className='single_button'>
              <Button type='button' onClick={addValue} name='early' value={early}>
                <MdExposurePlus1 />
              </Button>
            </div>
          </div>
          <div className='form_new_build_section'>
            <SelectBox type='text' emptyOption={true} emptyOptionText='Select your Item' options={filteredItemsStateOnlyName} name='mid' onChange={handleSelected} value={mid}>
              Choose mid game items (multiple choices)
            </SelectBox>
            <div className='single_button'>
              <Button type='button' onClick={addValue} name='mid' value={mid}>
                <MdExposurePlus1 />
              </Button>
            </div>
          </div>
          <div className='form_new_build_section'>
            <SelectBox type='text' emptyOption={true} emptyOptionText='Select your Item' options={filteredItemsStateOnlyName} name='late' onChange={handleSelected} value={late}>
              Choose late game items (multiple choices)
            </SelectBox>
            <div className='single_button'>
              <Button type='button' onClick={addValue} name='late' value={late}>
                <MdExposurePlus1 />
              </Button>
            </div>
          </div>
          <div className='form_new_build_section'>
            <SelectBox type='text' emptyOption={true} emptyOptionText='Select your Item' options={filteredItemsStateOnlyName} onChange={handleSelected} value={optional} name='optional'>
              Choose optional items (multiple choices)
            </SelectBox>
            <div className='single_button'>
              <Button type='button' onClick={addValue} name='optional' value={optional}>
                <MdExposurePlus1 />
              </Button>
            </div>
          </div>
        </div>

        <div className='form_new_build'>
          <h3>Preview</h3>
          <h4>
            Name: <span>{name}</span>
          </h4>
          <h4>
            Hero: <span>{hero}</span>
          </h4>

          <h4>Early Game:</h4>
          <div className='container_item_box'>
            {earlyArr.map(({ id, value }) => {
              return (
                <div className='item_box green' key={id}>
                  <span>{value}</span>
                  <MdDelete onClick={() => removeValue(id, 'early')} />
                </div>
              );
            })}
          </div>

          <h4>Mid Game:</h4>
          <div className='container_item_box'>
            {midArr.map(({ id, value }) => {
              return (
                <div className='item_box yellow' key={id}>
                  <span>{value}</span>
                  <MdDelete onClick={() => removeValue(id, 'mid')} />
                </div>
              );
            })}
          </div>

          <h4>Late Game:</h4>
          <div className='container_item_box'>
            {lateArr.map(({ id, value }) => {
              return (
                <div className='item_box red' key={id}>
                  <span>{value}</span>
                  <MdDelete onClick={() => removeValue(id, 'late')} />
                </div>
              );
            })}
          </div>
          <h4>Optional:</h4>
          <div className='container_item_box'>
            {optionalArr.map(({ id, value }) => {
              return (
                <div className='item_box blue' key={id}>
                  <span>{value}</span>
                  <MdDelete onClick={() => removeValue(id, 'optional')} />
                </div>
              );
            })}
          </div>
          <div className='buttons_group'>
            <Button type='submit' onClick={handleBuildSubmit}>
              Save
            </Button>
            <Button type='button' onClick={resetDefault}>
              Reset
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
