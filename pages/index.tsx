import { ReactElement, useEffect, useState } from 'react';
import Layout from '../layouts';
import { useStore } from '../hooks/store';
import Button from '../components/buttons/ button';
import SelectForm from '../components/forms/selectForm';
import useSWR from 'swr';
import { fetcher } from '../utils/fetcher';
import { IPostCode, IPostCodeDetail } from '../interfaces/postCode';
import Pagination from '../components/navigations/pagination';
import { IPagination } from '../interfaces/pagination';
import Table, { ITableData } from '../components/lists/table';
import Modal from '../components/overlays/modal';
import { IHouse } from '../interfaces/house';
import CreateHouseModal from '../components/templates/house/createHouseModal';
import axios from 'axios';

function Home(): ReactElement {
  const { state } = useStore();
  const { apiEndpoint } = state;

  const { data: postCodeData } = useSWR(() => apiEndpoint && `${apiEndpoint}/postCode`, fetcher);
  const [selectedPostCodeDetail, setSelectedPostCodeDetail] = useState<IPostCodeDetail>();

  // TODO: Can be moved to custom hook
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const { data: houseListingData, mutate: houseListingMutate } = useSWR(
    () => apiEndpoint && `${apiEndpoint}/home?skip=${currentPage * perPage}&take=${perPage}`,
    fetcher,
  );
  const [houseListing, setHouseListing] = useState<
    IPagination & {
      payload: IHouse[];
    }
  >();

  const [houseModal, setHouseModal] = useState(false);
  const [selectedHouse, setSelectedHouse] = useState<IHouse>();

  const mapPostCodeDataToOptionData = (postCode: IPostCode) => {
    return {
      label: postCode.post_code,
      value: postCode.post_code,
    };
  };

  const handleSelectPostCode = async (selected: any) => {
    const { value } = selected;

    const { payload } = await fetcher(`${apiEndpoint}/postCode/${value}`);

    setSelectedPostCodeDetail(payload);
  };

  useEffect(() => {
    if (!houseModal) {
      // clear selected house
      setSelectedHouse(undefined);
    }
  }, [houseModal]);

  useEffect(() => {
    if (!houseListingData) return;

    setHouseListing(houseListingData);
  }, [houseListingData]);

  const headers = [
    {
      title: 'ID',
      key: 'id',
    },
    {
      title: 'Name',
      key: 'name',
    },
    {
      title: 'Post Code',
      key: 'post_code',
    },
    {
      title: 'Price',
      key: 'price',
    },
    {
      title: 'Action',
      key: 'action',
    },
  ];

  const onDeletePostCodeListing = async (id: string) => {
    await axios.delete(`${apiEndpoint}/home/${id}`);
    houseListingMutate();
  };

  const mapHouseListingDataToTableData = (data: IHouse): ITableData => {
    return {
      id: data.id,
      name: data.name,
      post_code: data.post_code,
      price: data.price,
      action: (
        <div className='space-x-1'>
          <button
            className='text-[#FF9900] bg-[#FFF7E6] rounded-full py-2 px-5'
            onClick={() => {
              setSelectedHouse(data);
              setHouseModal(true);
            }}>
            VIEW DETAIL
          </button>
          <button
            className='text-[#B93E5C] bg-[#FDF4F7] rounded-full py-2 px-5'
            onClick={() => onDeletePostCodeListing(data.id)}>
            DELETE
          </button>
        </div>
      ),
    };
  };

  return (
    <>
      <div className='max-w-5xl m-auto px-4 py-4 space-y-11'>
        {/* Header */}
        <header className='flex justify-between items-center'>
          <h1 className='font-medium text-2xl'>HOUSE LIST</h1>
          <Button label='CREATE' onClick={() => setHouseModal(true)} />
        </header>
        {/* Content */}
        <main className='space-y-11'>
          {/* Table */}
          {houseListing && (
            <section className='space-y-5'>
              {/* Table Content */}
              <Table
                headers={headers}
                data={houseListing?.payload.map((payload) => mapHouseListingDataToTableData(payload))}
              />
              {/* Pagination */}
              <div className='flex justify-end'>
                <Pagination
                  currentPage={currentPage}
                  perPage={perPage}
                  onPerPageChange={(perPageChange: number) => setPerPage(perPageChange)}
                  totalCount={houseListing?.count}
                  onNextPage={() => setCurrentPage(currentPage + 1)}
                  onPreviousPage={() => setCurrentPage(currentPage - 1)}
                />
              </div>
            </section>
          )}
          {/* Post code selection */}
          <section className='bg-[#F4F7FC] pt-16 pb-11'>
            <div className='max-w-md m-auto space-y-3'>
              <SelectForm
                name='postCode'
                onChange={handleSelectPostCode}
                options={postCodeData?.payload.map((data: IPostCode) => mapPostCodeDataToOptionData(data))}
                placeholder='SELECT POST CODE'
              />
              {selectedPostCodeDetail && (
                <div className='text-[#3C64B1] text-lg font-semibold'>
                  <p>Average : {selectedPostCodeDetail?.average}</p>
                  <p>Median : {selectedPostCodeDetail?.median}</p>
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
      <Modal open={houseModal} setOpen={setHouseModal}>
        <CreateHouseModal
          onCancel={() => setHouseModal(false)}
          onSubmitSuccess={houseListingMutate}
          house={selectedHouse}
        />
      </Modal>
    </>
  );
}

const HOCHome: any = Home;

HOCHome.getLayout = function GetLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default HOCHome;
