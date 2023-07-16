import axios from 'axios';
import { CONSTANTS } from '../constants';
import { ContentTypeEnum } from '../enums/contentType';
import { SERVER } from '../configs';

const handleFetchError = () => {
  return;
};

export const fetcher = async (url: string) => {
  const accessToken = '';

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ContentType: ContentTypeEnum.APPLICATION_JSON,
      },
    });

    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      const refreshToken = '';

      if (!refreshToken) {
        handleFetchError();

        return;
      }

      try {
        const refreshResponse = await axios.post(`${SERVER}/api/user/auth/refresh-token`, {
          refreshToken,
        });

        if (refreshResponse.status !== 201) {
          handleFetchError();

          return;
        }

        const newAccessToken = refreshResponse.data.accessToken;

        // TODO: Save newAccessToken to localStorage

        const retryResponse = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${newAccessToken}`,
            ContentType: ContentTypeEnum.APPLICATION_JSON,
          },
        });

        return retryResponse.data;
      } catch (refreshError) {
        handleFetchError();
      }
    }

    handleFetchError();
  }
};
