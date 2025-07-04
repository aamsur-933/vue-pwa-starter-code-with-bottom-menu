
const db = require('../models');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class AttendancesDBApi {

    static async create(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const attendances = await db.attendances.create(
            {
                id: data.id || undefined,

        work_in_time: data.work_in_time
        ||
        null
            ,

        work_in_latitude: data.work_in_latitude
        ||
        null
            ,

        work_in_longitude: data.work_in_longitude
        ||
        null
            ,

        work_out_time: data.work_out_time
        ||
        null
            ,

        work_out_latitude: data.work_out_latitude
        ||
        null
            ,

        work_out_longitude: data.work_out_longitude
        ||
        null
            ,

            importHash: data.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
    },
        { transaction },
    );

        return attendances;
    }

    static async bulkImport(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        // Prepare data - wrapping individual data transformations in a map() method
        const attendancesData = data.map((item, index) => ({
                id: item.id || undefined,

                work_in_time: item.work_in_time
            ||
            null
            ,

                work_in_latitude: item.work_in_latitude
            ||
            null
            ,

                work_in_longitude: item.work_in_longitude
            ||
            null
            ,

                work_out_time: item.work_out_time
            ||
            null
            ,

                work_out_latitude: item.work_out_latitude
            ||
            null
            ,

                work_out_longitude: item.work_out_longitude
            ||
            null
            ,

            importHash: item.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
            createdAt: new Date(Date.now() + index * 1000),
    }));

        // Bulk create items
        const attendances = await db.attendances.bulkCreate(attendancesData, { transaction });

        return attendances;
    }

    static async update(id, data, options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;

        const attendances = await db.attendances.findByPk(id, {}, {transaction});

        const updatePayload = {};

        if (data.work_in_time !== undefined) updatePayload.work_in_time = data.work_in_time;

        if (data.work_in_latitude !== undefined) updatePayload.work_in_latitude = data.work_in_latitude;

        if (data.work_in_longitude !== undefined) updatePayload.work_in_longitude = data.work_in_longitude;

        if (data.work_out_time !== undefined) updatePayload.work_out_time = data.work_out_time;

        if (data.work_out_latitude !== undefined) updatePayload.work_out_latitude = data.work_out_latitude;

        if (data.work_out_longitude !== undefined) updatePayload.work_out_longitude = data.work_out_longitude;

        updatePayload.updatedById = currentUser.id;

        await attendances.update(updatePayload, {transaction});

        return attendances;
    }

    static async deleteByIds(ids, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const attendances = await db.attendances.findAll({
            where: {
                id: {
                    [Op.in]: ids,
                },
            },
            transaction,
        });

        await db.sequelize.transaction(async (transaction) => {
            for (const record of attendances) {
                await record.update(
                    {deletedBy: currentUser.id},
                    {transaction}
                );
            }
            for (const record of attendances) {
                await record.destroy({transaction});
            }
        });

        return attendances;
    }

    static async remove(id, options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;

        const attendances = await db.attendances.findByPk(id, options);

        await attendances.update({
            deletedBy: currentUser.id
        }, {
            transaction,
        });

        await attendances.destroy({
            transaction
        });

        return attendances;
    }

    static async findBy(where, options) {
        const transaction = (options && options.transaction) || undefined;

        const attendances = await db.attendances.findOne(
            { where },
            { transaction },
        );

        if (!attendances) {
            return attendances;
        }

        const output = attendances.get({plain: true});

        return output;
    }

    static async findAll(filter, options) {
        const limit = filter.limit || 0;
        let offset = 0;
        let where = {};
        const currentPage = +filter.page;

        const user = (options && options.currentUser) || null;

        offset = currentPage * limit;

        const orderBy = null;

        const transaction = (options && options.transaction) || undefined;

        let include = [];

        if (filter) {
            if (filter.id) {
                where = {
                    ...where,
                    ['id']: Utils.uuid(filter.id),
                };
            }

            if (filter.work_in_timeRange) {
                const [start, end] = filter.work_in_timeRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    work_in_time: {
                    ...where.work_in_time,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    work_in_time: {
                    ...where.work_in_time,
                            [Op.lte]: end,
                    },
                };
                }
            }

            if (filter.work_in_latitudeRange) {
                const [start, end] = filter.work_in_latitudeRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    work_in_latitude: {
                    ...where.work_in_latitude,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    work_in_latitude: {
                    ...where.work_in_latitude,
                            [Op.lte]: end,
                    },
                };
                }
            }

            if (filter.work_in_longitudeRange) {
                const [start, end] = filter.work_in_longitudeRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    work_in_longitude: {
                    ...where.work_in_longitude,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    work_in_longitude: {
                    ...where.work_in_longitude,
                            [Op.lte]: end,
                    },
                };
                }
            }

            if (filter.work_out_timeRange) {
                const [start, end] = filter.work_out_timeRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    work_out_time: {
                    ...where.work_out_time,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    work_out_time: {
                    ...where.work_out_time,
                            [Op.lte]: end,
                    },
                };
                }
            }

            if (filter.work_out_latitudeRange) {
                const [start, end] = filter.work_out_latitudeRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    work_out_latitude: {
                    ...where.work_out_latitude,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    work_out_latitude: {
                    ...where.work_out_latitude,
                            [Op.lte]: end,
                    },
                };
                }
            }

            if (filter.work_out_longitudeRange) {
                const [start, end] = filter.work_out_longitudeRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    work_out_longitude: {
                    ...where.work_out_longitude,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    work_out_longitude: {
                    ...where.work_out_longitude,
                            [Op.lte]: end,
                    },
                };
                }
            }

            if (filter.active !== undefined) {
                where = {
                    ...where,
                    active: filter.active === true || filter.active === 'true'
                };
            }

            if (filter.createdAtRange) {
                const [start, end] = filter.createdAtRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                        ['createdAt']: {
                            ...where.createdAt,
                            [Op.gte]: start,
                        },
                    };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                        ['createdAt']: {
                            ...where.createdAt,
                            [Op.lte]: end,
                        },
                    };
                }
            }
        }

        const queryOptions = {
            where,
            include,
            distinct: true,
            order: filter.field && filter.sort
                ? [[filter.field, filter.sort]]
                : [['createdAt', 'desc']],
            transaction: options?.transaction,
            logging: console.log
        };

        if (!options?.countOnly) {
            queryOptions.limit = limit ? Number(limit) : undefined;
            queryOptions.offset = offset ? Number(offset) : undefined;
        }

        try {
            const { rows, count } = await db.attendances.findAndCountAll(queryOptions);

            return {
                rows: options?.countOnly ? [] : rows,
                count: count
            };
        } catch (error) {
            console.error('Error executing query:', error);
            throw error;
        }
    }

    static async findAllAutocomplete(query, limit, offset) {
        let where = {};

        if (query) {
            where = {
                [Op.or]: [
                    { ['id']: Utils.uuid(query) },
                    Utils.ilike(
                        'attendances',
                        'work_in_time',
                        query,
                    ),
                ],
            };
        }

        const records = await db.attendances.findAll({
            attributes: [ 'id', 'work_in_time' ],
            where,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            orderBy: [['work_in_time', 'ASC']],
        });

        return records.map((record) => ({
            id: record.id,
            label: record.work_in_time,
        }));
    }

};

