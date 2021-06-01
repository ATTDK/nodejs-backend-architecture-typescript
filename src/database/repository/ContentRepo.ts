import Content, { ContentModel } from '../model/Content';
import Site, { SiteModel} from '../model/Site'
import { InternalError } from '../../core/ApiError';
import { Number, Types } from 'mongoose';

export default class ContentRepo {
  private static CONTENT_ALL_DATA =
  '+title +views +likes +commentCount ';

  // 다시 만들어야함
  public static findLinkIfExists(link: string): Promise<Content | null> {
    return ContentModel.findOne({ link: link })
      .lean<Content>()
      .exec();
  }

  public static async update(content: Content): Promise<Content> {
    return ContentModel.updateOne({ _id: content._id }, { $set: { ...content } })
      .lean<Content>()
      .exec();
  }

  public static findContentAllDataById(link: string | null | undefined): Promise<Content | null> {
    return ContentModel.findOne({ link: link })
      .select(this.CONTENT_ALL_DATA)
      .lean<Content>()
      .exec();
  }


  public static async create(content: Content): Promise< Content > {
    const createdContent = await ContentModel.create(content);
    return createdContent;
  }

}
