using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using CPM.Infrastructure.Domain;
using Microsoft.EntityFrameworkCore;

namespace CPM.Repository
{
	public class RepositoryBase<T> : IRepository<T> where T : class
    {
        private readonly DbSet<T> _entities;

        public RepositoryBase(DbContext context)
        {
            _entities = context.Set<T>();
        }

        public virtual T FindById(int id)
        {
            return _entities.Find(id);
        }

        public virtual IEnumerable<T> FindAll()
        {
            return _entities.ToList();
        }

        public virtual IEnumerable<T> FindBy(Expression<Func<T, bool>> predicate)
        {
            return _entities.Where(predicate);
        }

        public virtual void Add(T entity)
        {
            _entities.Add(entity);
        }

        public virtual void AddRange(IEnumerable<T> entities)
        {
            _entities.AddRange(entities);
        }

        public virtual void Update(T entity)
        {
            _entities.Update(entity);
        }

        public virtual void Remove(T entity)
        {
            _entities.Remove(entity);
        }

        public virtual void RemoveRange(IEnumerable<T> entities)
        {
            _entities.RemoveRange(entities);
        }
    }
}
